import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import DatePicker from "../date-picker.tsx";

export default function DefaultInputs() {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" },
  ];
  
  const handleSelectChange = (value: string) => {
    console.log("Selected priority:", value);
  };

  return (
    <ComponentCard title="Task Properties Form">
      <div className="space-y-6">
        <div>
          <Label htmlFor="taskName">Task Name</Label>
          <Input type="text" id="taskName" placeholder="e.g., Integrate Authentication API" />
        </div>
        <div>
          <Label htmlFor="assigneeEmail">Assignee Contact</Label>
          <Input type="text" id="assigneeEmail" placeholder="team-member@sprintflow.com" />
        </div>
        <div>
          <Label>Task Priority Tier</Label>
          <Select
            options={options}
            placeholder="Select priority level"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label>Secure Access Key (Optional Token)</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter webhook secret or token"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <DatePicker
            id="date-picker"
            label="Sprint Due Date"
            placeholder="Select deadline"
            onChange={(dates, currentDateString) => {
              console.log({ dates, currentDateString });
            }}
          />
        </div>

        <div>
          <Label htmlFor="timeReminder">Daily Standup Reminder Time</Label>
          <div className="relative">
            <Input
              type="time"
              id="timeReminder"
              name="timeReminder"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}