// App.jsx
import React, { useState } from "react";
import SchemaBuilder from "@/components/SchemaBuilder";
import JSONPreview from "@/components/JSONPreview";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const App = () => {
  const [schema, setSchema] = useState({});

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">JSON Schema Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Schema Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <SchemaBuilder schema={schema} setSchema={setSchema} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live JSON Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <JSONPreview schema={schema} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
