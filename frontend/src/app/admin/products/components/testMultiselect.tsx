// src/app/page.tsx

"use client";

import React, { useState } from "react";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { MultiSelect } from "./multiSelect";

const frameworksList = [
  { value: "1", label: "React", icon: Turtle },
  { value: "2", label: "Angular", icon: Cat },
  { value: "3", label: "Vue", icon: Dog },
  { value: "4", label: "Svelte", icon: Rabbit },
  { value: "5", label: "Ember", icon: Fish },
];

function Home() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["2", "3"]);

  return (
    <div className="p-4 max-w-xl ">
      <h1 className="text-2xl font-bold mb-4">Multi-Select Component</h1>
      <MultiSelect
      className="bg-slate-50 dark:bg-gray-800"
        options={frameworksList}
        onValueChange={setSelectedFrameworks}
        defaultValue={selectedFrameworks}
        placeholder="Select frameworks"
        variant="inverted"
        animation={2}
        maxCount={3}
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Selected Frameworks:</h2>
        <ul className="list-disc list-inside">
          {selectedFrameworks.map((framework) => (
            <li key={framework}>{framework}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;