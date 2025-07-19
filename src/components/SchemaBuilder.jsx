// components/SchemaBuilder.jsx
import React, { useState } from "react";
import FieldRow from "@/components/FieldRow";
import { Button } from "@/components/ui/button";

const SchemaBuilder = ({ schema, setSchema }) => {
  const [fields, setFields] = useState([]);

  const updateField = (updatedField, index) => {
    const newFields = [...fields];
    newFields[index] = updatedField;
    setFields(newFields);
    setSchema(buildSchema(newFields));
  };

  const addField = () => {
    const newFields = [...fields, { key: "", type: "String", children: [] }];
    setFields(newFields);
    setSchema(buildSchema(newFields));
  };

  const deleteField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    setSchema(buildSchema(newFields));
  };

  const buildSchema = (fieldList) => {
    const obj = {};
    fieldList.forEach((field) => {
      const key = field.key || "";
      switch (field.type) {
        case "String":
          obj[key] = "";
          break;
        case "Number":
          obj[key] = 0;
          break;
        case "Float":
          obj[key] = 0.0;
          break;
        case "Boolean":
          obj[key] = field.value ?? false;
          break;
        case "ObjectId":
          obj[key] = "000000000000000000000000";
          break;
        case "Nested":
          obj[key] = buildSchema(field.children);
          break;
        default:
          obj[key] = null;
      }
    });
    return obj;
  };

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <FieldRow
          key={index}
          field={field}
          onChange={(updatedField) => updateField(updatedField, index)}
          onDelete={() => deleteField(index)}
        />
      ))}
      <Button onClick={addField} variant="default">
        + Add Field
      </Button>
    </div>
  );
};

export default SchemaBuilder;
