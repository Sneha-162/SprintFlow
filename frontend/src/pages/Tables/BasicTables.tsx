import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Epic Backlog Matrix | SprintFlow"
        description="Detailed cross-project management spreadsheet tracking team allocations, active metrics, and sprint constraints."
      />
      <PageBreadcrumb pageTitle="Project Backlog Matrix" />
      <div className="space-y-6">
        <ComponentCard 
          title="Active Projects Matrix" 
          desc="Overview of project owners, team assignments, budget allocations, and health states."
        >
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}