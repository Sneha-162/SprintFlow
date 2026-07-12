import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Select from "../Select";
import MultiSelect from "../MultiSelect";

export default function SelectInputs() {
  const options = [
    { value: "sprintflow-core", label: "SprintFlow App Blueprint" },
    { value: "database-migration", label: "Backend API Framework" },
    { value: "marketing-site", label: "Marketing Landing View" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected target workspace project:", value);
  };
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const multiOptions = [
    { value: "auth", text: "Security/Auth Theme", selected: false },
    { value: "ui", text: "Frontend Layout Component", selected: false },
    { value: "bugfix", text: "Active Bug Remediation", selected: false },
    { value: "testing", text: "Integration Test Coverage", selected: false },
  ];

  return (
    <ComponentCard title="Workspace Select Triggers">
      <div className="space-y-6">
        <div>
          <Select
            options={options}
            placeholder="Assign to Project Area"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <MultiSelect
            label="Apply Task Labels"
            options={multiOptions}
            defaultSelected={["auth", "ui"]}
            onChange={(values) => setSelectedValues(values)}
          />
          <p className="sr-only">
            Active Labels Applied: {selectedValues.join(", ")}
          </p>
        </div>
      </div>
    </ComponentCard>
  );
}