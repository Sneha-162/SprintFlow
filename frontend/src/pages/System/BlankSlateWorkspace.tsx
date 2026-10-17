import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

type ProjectStatus = "Planning" | "Active" | "On Hold";

type Project = {
  id: string;
  name: string;
  key: string;
  description: string;
  owner: string;
  status: ProjectStatus;
  createdAt: string;
};

type ProjectForm = {
  name: string;
  key: string;
  description: string;
  owner: string;
};

const STORAGE_KEY = "sprintflow_workspace_projects";

const initialForm: ProjectForm = {
  name: "",
  key: "",
  description: "",
  owner: "",
};

function createProjectId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function makeProjectKey(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 5)
    .toUpperCase();
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function BlankSlateWorkspace() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [error, setError] = useState("");

  /*
   * Load workspace projects.
   *
   * For now this uses localStorage so the workspace is actually usable
   * without requiring a backend project API.
   *
   * When your backend Project API is ready, replace this load/save logic
   * with API calls.
   */
  useEffect(() => {
    try {
      const storedProjects = localStorage.getItem(STORAGE_KEY);

      if (!storedProjects) {
        return;
      }

      const parsed = JSON.parse(storedProjects);

      if (Array.isArray(parsed)) {
        setProjects(parsed);
      }
    } catch (storageError) {
      console.error("Unable to load SprintFlow projects:", storageError);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (storageError) {
      console.error("Unable to save SprintFlow projects:", storageError);
    }
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return projects;
    }

    return projects.filter((project) => {
      return (
        project.name.toLowerCase().includes(query) ||
        project.key.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.owner.toLowerCase().includes(query)
      );
    });
  }, [projects, search]);

  const activeProjects = projects.filter(
    (project) => project.status === "Active",
  ).length;

  const planningProjects = projects.filter(
    (project) => project.status === "Planning",
  ).length;

  function openCreateProject() {
    setError("");
    setForm(initialForm);
    setIsCreateOpen(true);
  }

  function closeCreateProject() {
    setError("");
    setForm(initialForm);
    setIsCreateOpen(false);
  }

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      key:
        current.key === "" || current.key === makeProjectKey(current.name)
          ? makeProjectKey(value)
          : current.key,
    }));
  }

  function handleCreateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const key = form.key.trim().toUpperCase();
    const owner = form.owner.trim();

    if (!name) {
      setError("Project name is required.");
      return;
    }

    if (!key) {
      setError("Project key is required.");
      return;
    }

    if (!owner) {
      setError("Project owner is required.");
      return;
    }

    const duplicateKey = projects.some(
      (project) => project.key.toLowerCase() === key.toLowerCase(),
    );

    if (duplicateKey) {
      setError("A project with this key already exists.");
      return;
    }

    const newProject: Project = {
      id: createProjectId(),
      name,
      key,
      description: form.description.trim(),
      owner,
      status: "Planning",
      createdAt: new Date().toISOString(),
    };

    setProjects((current) => [newProject, ...current]);

    closeCreateProject();
  }

  function updateProjectStatus(id: string, status: ProjectStatus) {
    setProjects((current) =>
      current.map((project) =>
        project.id === id
          ? {
              ...project,
              status,
            }
          : project,
      ),
    );
  }

  function deleteProject(projectId: string) {
    const shouldDelete = window.confirm(
      "Are you sure you want to remove this project from the workspace?",
    );

    if (!shouldDelete) {
      return;
    }

    setProjects((current) =>
      current.filter((project) => project.id !== projectId),
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>System</span>

              <span>/</span>

              <span>Workspace</span>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              SprintFlow Workspace
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Create projects, organize delivery work, and manage your team's
              SprintFlow workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateProject}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-600"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            New project
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total projects
            </p>

            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              {projects.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Active projects
            </p>

            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              {activeProjects}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              In planning
            </p>

            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              {planningProjects}
            </p>
          </div>
        </div>

        {/* Workspace shortcuts */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Link
            to="/form-elements"
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Create Task
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Add work items and task details.
                </p>
              </div>

              <span className="text-xl text-gray-400 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>

          <Link
            to="/basic-tables"
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Project Backlog
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Review epics and backlog items.
                </p>
              </div>

              <span className="text-xl text-gray-400 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>

          <Link
            to="/calendar"
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Delivery Calendar
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Review milestones and delivery dates.
                </p>
              </div>

              <span className="text-xl text-gray-400 transition group-hover:translate-x-1">
                →
              </span>
            </div>
          </Link>
        </div>

        {/* Main workspace */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex flex-col gap-4 border-b border-gray-200 p-5 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Projects
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Projects available in this workspace.
              </p>
            </div>

            {projects.length > 0 && (
              <div className="relative w-full sm:w-72">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M16 16L21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search projects..."
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </div>

          {/* Truly blank workspace */}
          {projects.length === 0 && (
            <div className="flex min-h-[440px] items-center justify-center px-6 py-12">
              <div className="max-w-lg text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 5.5C4 4.67157 4.67157 4 5.5 4H18.5C19.3284 4 20 4.67157 20 5.5V18.5C20 19.3284 19.3284 20 18.5 20H5.5C4.67157 20 4 19.3284 4 18.5V5.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M8 9H16M8 12H14M8 15H12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your workspace is ready
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Create your first project to start organizing sprints, tasks,
                  backlog items, milestones, and AI-assisted planning.
                </p>

                <button
                  type="button"
                  onClick={openCreateProject}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-brand-600"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                  Create first project
                </button>

                <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-800">
                  <p className="text-xs leading-5 text-gray-400">
                    Projects created here are currently stored in your browser.
                    When the SprintFlow Project API is connected, this page can
                    persist projects in the backend database instead.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Search produced nothing */}
          {projects.length > 0 && filteredProjects.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center px-6 py-12 text-center">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  No projects found
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Try searching with a different project name, key, or owner.
                </p>
              </div>
            </div>
          )}

          {/* Project cards */}
          {filteredProjects.length > 0 && (
            <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-xl border border-gray-200 p-5 transition hover:shadow-sm dark:border-gray-800"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-600 dark:bg-brand-500/10">
                        {project.key}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                          {project.name}
                        </h3>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {project.key}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                        project.status === "Active"
                          ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                          : project.status === "On Hold"
                            ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="mt-4 min-h-10 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    {project.description ||
                      "No project description has been added yet."}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 text-sm dark:border-gray-800">
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Owner</span>

                      <span className="truncate font-medium text-gray-700 dark:text-gray-300">
                        {project.owner}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Created</span>

                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link
                      to="/basic-tables"
                      className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-3 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
                    >
                      Open backlog
                    </Link>

                    <Link
                      to="/form-elements"
                      className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                    >
                      Add task
                    </Link>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <select
                      value={project.status}
                      onChange={(event) =>
                        updateProjectStatus(
                          project.id,
                          event.target.value as ProjectStatus,
                        )
                      }
                      className="rounded-lg border border-gray-300 bg-transparent px-2 py-2 text-xs text-gray-600 outline-none dark:border-gray-700 dark:text-gray-300"
                    >
                      <option value="Planning">Planning</option>
                      <option value="Active">Active</option>
                      <option value="On Hold">On Hold</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => deleteProject(project.id)}
                      className="text-xs font-medium text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create project modal */}
      {isCreateOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              closeCreateProject();
            }
          }}
        >
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl dark:border dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-800">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create project
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Add a new project to your SprintFlow workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={closeCreateProject}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateProject}>
              <div className="space-y-5 p-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Project name
                  </label>

                  <input
                    autoFocus
                    value={form.name}
                    onChange={(event) => handleNameChange(event.target.value)}
                    placeholder="e.g. SprintFlow Mobile App"
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Project key
                  </label>

                  <input
                    value={form.key}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        key: event.target.value
                          .toUpperCase()
                          .replace(/[^A-Z0-9]/g, "")
                          .slice(0, 6),
                      }))
                    }
                    placeholder="e.g. SF"
                    maxLength={6}
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm uppercase text-gray-900 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:text-white"
                  />

                  <p className="mt-1.5 text-xs text-gray-400">
                    Used as the short identifier for your project.
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Project owner
                  </label>

                  <input
                    value={form.owner}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        owner: event.target.value,
                      }))
                    }
                    placeholder="Enter project owner"
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="What is this project trying to achieve?"
                    className="w-full resize-none rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:text-white"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                    {error}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-800">
                <button
                  type="button"
                  onClick={closeCreateProject}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
                >
                  Create project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}