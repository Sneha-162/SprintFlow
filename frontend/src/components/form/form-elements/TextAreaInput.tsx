import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";

export default function TextAreaInput() {
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  return (
    <ComponentCard title="Task Description Editor">
      <div className="space-y-6">
        {/* Default Description Area */}
        <div>
          <Label>Task Summary & User Story</Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            placeholder="As a developer, I want to..."
            rows={6}
          />
        </div>

        {/* Disabled Description Area */}
        <div>
          <Label>Locked Epic Description (Read-Only)</Label>
          <TextArea rows={6} value="This summary description has been archived by the product owner." disabled />
        </div>

        {/* Error Description Area */}
        <div>
          <Label>Required Acceptance Criteria</Label>
          <TextArea
            rows={6}
            value={messageTwo}
            error
            onChange={(value) => setMessageTwo(value)}
            hint="Acceptance criteria description cannot be left empty."
          />
        </div>
      </div>
    </ComponentCard>
  );
}