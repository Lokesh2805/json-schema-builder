// components/JSONPreview.jsx
import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const JSONPreview = ({ schema }) => {
  return (
    <Card className="bg-white shadow">
      <CardContent className="p-4 max-h-[500px] overflow-auto">
        <pre className="text-sm text-gray-800">
          {JSON.stringify(schema, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
};

export default JSONPreview;
