// components/FieldRow.jsx
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const FieldRow = ({ field, onChange, onDelete }) => {
  const [keyName, setKeyName] = useState(field.key || "");
  const [type, setType] = useState(field.type || "String");
  const [children, setChildren] = useState(field.children || []);
  const [boolValue, setBoolValue] = useState(field.value ?? false);

  useEffect(() => {
    if (type === "Nested") {
      onChange({ key: keyName, type, children });
    } else if (type === "Boolean") {
      onChange({ key: keyName, type, value: boolValue });
    } else {
      onChange({ key: keyName, type });
    }
  }, [keyName, type, children, boolValue]);

  const updateChild = (updatedChild, index) => {
    const newChildren = [...children];
    newChildren[index] = updatedChild;
    setChildren(newChildren);
  };

  const addNestedField = () => {
    setChildren([...children, { key: "", type: "String" }]);
  };

  const deleteNestedField = (index) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  return (
    <div className="ml-4 border-l pl-4 border-gray-300 py-2">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          placeholder="Field name"
          className="w-40"
        />

        <Select value={type} onValueChange={(val) => setType(val)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="String">String</SelectItem>
            <SelectItem value="Number">Number</SelectItem>
            <SelectItem value="Float">Float</SelectItem>
            <SelectItem value="Boolean">Boolean</SelectItem>
            <SelectItem value="ObjectId">ObjectId</SelectItem>
            <SelectItem value="Nested">Nested</SelectItem>
          </SelectContent>
        </Select>

        {type === "Boolean" && (
          <div className="flex items-center gap-2">
            <Switch checked={boolValue} onCheckedChange={setBoolValue} />
            <span className="text-sm">Default: {boolValue ? "true" : "false"}</span>
          </div>
        )}

        <Button variant="destructive" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>

      {type === "Nested" && (
        <div className="mt-2 ml-6 space-y-2">
          {children.map((child, index) => (
            <FieldRow
              key={index}
              field={child}
              onChange={(updatedChild) => updateChild(updatedChild, index)}
              onDelete={() => deleteNestedField(index)}
            />
          ))}
          <Button variant="outline" size="sm" onClick={addNestedField}>
            + Add Nested Field
          </Button>
        </div>
      )}
    </div>
  );
};

export default FieldRow;
