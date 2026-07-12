import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Project Allocation
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Task distribution across active projects
          </p>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Manage Projects
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Visual Workspace Breakdown Box replacing the old map block */}
      <div className="px-4 py-8 my-6 overflow-hidden border border-gray-200 rounded-2xl bg-gray-50 dark:bg-gray-800/20 dark:border-gray-800 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-brand-500 dark:text-brand-400">60 Total Tasks</span>
        <p className="text-xs text-gray-400 mt-2 max-w-[240px]">
          Track progress and status constraints across your running project initiatives.
        </p>
      </div>

      <div className="space-y-5">
        {/* Project 1 Progress Bar Breakdown */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                SprintFlow App
              </p>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                42 Tasks Allocated
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
              <div className="absolute left-0 top-0 flex h-full w-[70%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
            </div>
            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              70%
            </p>
          </div>
        </div>

        {/* Project 2 Progress Bar Breakdown */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                Backend API Infrastructure
              </p>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                18 Tasks Allocated
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-[140px] items-center gap-3">
            <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
              <div className="absolute left-0 top-0 flex h-full w-[30%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
            </div>
            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              30%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}