import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// Define the TypeScript interface for project task rows
interface Task {
  id: number;
  taskName: string;
  project: string; 
  assignee: string; 
  priority: "High" | "Medium" | "Low"; 
  status: "Completed" | "In Progress" | "Stuck"; 
  avatar: string; 
}

// Define the project tracking table mock data
const tableData: Task[] = [
  {
    id: 1,
    taskName: "Integrate Authentication API",
    project: "SprintFlow App",
    assignee: "Samarth",
    priority: "High",
    status: "Completed",
    avatar: "/images/user/user-01.jpg",
  },
  {
    id: 2,
    taskName: "Design Kanban Board View",
    project: "SprintFlow App",
    assignee: "Alex",
    priority: "Medium",
    status: "In Progress",
    avatar: "/images/user/user-02.jpg",
  },
  {
    id: 3,
    taskName: "Setup PostgreSQL Schema",
    project: "Backend Database Lifecycle",
    assignee: "Shreya",
    priority: "High",
    status: "Completed",
    avatar: "/images/user/user-03.jpg",
  },
  {
    id: 4,
    taskName: "Fix Tailwind Darkmode Flickering",
    project: "Marketing Landing Page",
    assignee: "Tanya ",
    priority: "Low",
    status: "Stuck",
    avatar: "/images/user/user-04.jpg",
  },
  {
    id: 5,
    taskName: "Write Unit Tests for Payment Webhooks",
    project: "Fintech Core Gateway",
    assignee: "David ",
    priority: "High",
    status: "In Progress",
    avatar: "/images/user/user-05.jpg",
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Tasks
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current text-gray-500 dark:text-gray-400 size-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M7 12H17M9 18H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all tasks
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Task & Project Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Assignee
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Priority
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="py-3">
                  <div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {task.taskName}
                    </p>
                    <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                      {task.project}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-200">
                      <img src={task.avatar} className="h-full w-full object-cover" alt={task.assignee} />
                    </div>
                    <span>{task.assignee}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                    task.priority === "High" ? "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400" :
                    task.priority === "Medium" ? "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400" :
                    "text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400"
                  }`}>
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      task.status === "Completed"
                        ? "success"
                        : task.status === "In Progress"
                        ? "warning"
                        : "error"
                    }
                  >
                    {task.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}