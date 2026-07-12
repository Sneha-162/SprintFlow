import ProjectMetrics from "../../components/Project/ProjectMetrics";
import TaskVelocityChart from "../../components/Project/TaskVelocityChart";
import WorkloadStatisticsChart from "../../components/Project/WorkloadStatisticsChart";
import SprintProgressCard from "../../components/Project/SprintProgressCard";
import RecentTasksTable from "../../components/Project/RecentTasksTable";
import ProjectAllocationCard from "../../components/Project/ProjectAllocationCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Project Tracker Dashboard | SprintFlow"
        description="Overview of active projects, task completion rates, and upcoming milestones."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Left Column - Metrics & Main Overview Chart */}
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <ProjectMetrics />

          {/* Project Velocity / Task Burn-down chart */}
          <TaskVelocityChart />
        </div>

        {/* Right Column - Target Progress */}
        <div className="col-span-12 xl:col-span-5">
          {/* Sprint Goal / Milestone progress breakdown */}
          <SprintProgressCard />
        </div>

        {/* Wide Row - Detailed Status Charts */}
        <div className="col-span-12">
          {/* Task status statistics over time */}
          <WorkloadStatisticsChart />
        </div>

        {/* Lower Left - Team Allocation / Workload */}
        <div className="col-span-12 xl:col-span-5">
          {/* Team Member Workload or Task Distribution */}
          <ProjectAllocationCard />
        </div>

        {/* Lower Right - List of Tasks/Projects */}
        <div className="col-span-12 xl:col-span-7">
          {/* Recent Project Tasks / Activity log */}
          <RecentTasksTable />
        </div>
      </div>
    </>
  );
}