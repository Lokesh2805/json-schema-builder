// App.jsx
import React, { useState } from 'react';
import { Tabs, Tab } from '@/components/ui/tabs';
import SchemaBuilder from './components/SchemaBuilder';
import JSONPreview from './components/JSONPreview';

const App = () => {
  const [schema, setSchema] = useState({});

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">JSON Schema Builder</h1>
      <Tabs defaultValue="builder" className="max-w-4xl mx-auto">
        <Tab value="builder" label="Schema Builder">
          <SchemaBuilder schema={schema} setSchema={setSchema} />
        </Tab>
        <Tab value="preview" label="JSON Preview">
          <JSONPreview schema={schema} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default App;
