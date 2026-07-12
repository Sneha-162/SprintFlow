
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";

export default function UserProfiles() {
  return (
    <>
      <PageMeta
        title="Team Directory Profile | SprintFlow"
        description="View project roles, workload performance thresholds, and operational system stats."
      />
      <PageBreadcrumb pageTitle="Team Directory Member Profile" />
      
      <div className="space-y-6">
        {/* Main User Metadata header card */}
        <UserMetaCard />
        
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Detailed team metadata description blocks */}
          <UserInfoCard />
          
          {/* Clean placeholder card replacing the deleted billing module */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90 mb-4">
              Active Project Workspaces
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This member is currently assigned to **SprintFlow Application Architecture** and the **Core API Gateway Migration** pipelines.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}