"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainComponentSim from "./components/MainComponentSim";

export default function Simulasi() {
  const [simulationId, setSimulationId] = useState<string>("");
  const simulationIdRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleNavigate = () => {
    const simId = simulationIdRef.current?.value.trim();
    if (simId) {
      setSimulationId(simId); // Update state to trigger re-render
      router.push(`/simulation?id=${simId}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNavigate();
    }
  };

  return (
    <div className="container mx-auto min-h-screen py-4">
      <Card className="p-4 flex gap-2">
        <input
          ref={simulationIdRef}
          type="text"
          placeholder="Cari Simulasi berdasarkan ID"
          onKeyDown={handleKeyDown}
          className="border rounded-md px-2 py-1 w-full"
        />
        <Button onClick={handleNavigate}>Cari</Button>
      </Card>
      <MainComponentSim />
    </div>
  );
}
