"use client";

import { useState, useEffect } from "react";
import ComponentSelection from "./ComponentSelection";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "./Interfaces";

export default function StorageComponentSim() {
  const [components, setComponents] = useState<{
    ssds: { key: string; product: Product | null }[];
    hdds: { key: string; product: Product | null }[];
  }>({ ssds: [], hdds: [] });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedComponents = localStorage.getItem("storedComponents");

    if (storedComponents) {
      try {
        const parsedComponents = JSON.parse(storedComponents);
        if (
          parsedComponents &&
          parsedComponents.ssds &&
          parsedComponents.hdds
        ) {
          setComponents(parsedComponents);
        }
      } catch (error) {
        console.error(
          "Error parsing components data from localStorage:",
          error
        );
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (components.ssds.length > 0 || components.hdds.length > 0) {
      localStorage.setItem("storedComponents", JSON.stringify(components));
    } else {
      localStorage.removeItem("storedComponents");
    }
  }, [components]);

  const handleAddSSDToSimulation = (index: number, product: Product) => {
    setComponents((prevComponents) => {
      const updatedSsds = [...prevComponents.ssds];
      updatedSsds[index].product = product;
      return { ...prevComponents, ssds: updatedSsds };
    });
  };

  const handleDeleteSSDFromSimulation = (index: number) => {
    setComponents((prevComponents) => {
      const updatedSsds = prevComponents.ssds.filter((_, i) => i !== index);
      return {
        ...prevComponents,
        ssds: updatedSsds.map((ssd, idx) => ({ ...ssd, key: `SSD${idx + 1}` })),
      };
    });
  };

  const handleAddHDDToSimulation = (index: number, product: Product) => {
    setComponents((prevComponents) => {
      const updatedHdds = [...prevComponents.hdds];
      updatedHdds[index].product = product;
      return { ...prevComponents, hdds: updatedHdds };
    });
  };

  const handleDeleteHDDFromSimulation = (index: number) => {
    setComponents((prevComponents) => {
      const updatedHdds = prevComponents.hdds.filter((_, i) => i !== index);
      return {
        ...prevComponents,
        hdds: updatedHdds.map((hdd, idx) => ({ ...hdd, key: `HDD${idx + 1}` })),
      };
    });
  };

  const addNewSSD = () => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      ssds: [
        ...prevComponents.ssds,
        { key: `SSD${prevComponents.ssds.length + 1}`, product: null },
      ],
    }));
  };

  const addNewHDD = () => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      hdds: [
        ...prevComponents.hdds,
        { key: `HDD${prevComponents.hdds.length + 1}`, product: null },
      ],
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Storage</h2>

        {/* SSDs Component */}
        <div className="p-4 border rounded-lg mb-4 max-h-[30vh] overflow-scroll overflow-x-hidden">
          {components.ssds.map((ssd, index) => (
            <div key={ssd.key} className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Pilih {ssd.key} (SSD)
              </h3>
              <ComponentSelection
                initialProduct={ssd.product}
                categoryId={6}
                socketId=""
                ramTypeId=""
                onAddToSimulation={(product) =>
                  handleAddSSDToSimulation(index, product)
                }
                onDelete={() => handleDeleteSSDFromSimulation(index)}
              />
            </div>
          ))}
        </div>

        {/* HDDs Component */}
        <div className="p-4 border rounded-lg mb-4">
          {components.hdds.map((hdd, index) => (
            <div key={hdd.key} className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Pilih {hdd.key} (HDD)
              </h3>
              <ComponentSelection
                initialProduct={hdd.product}
                categoryId={7}
                socketId=""
                ramTypeId=""
                onAddToSimulation={(product) =>
                  handleAddHDDToSimulation(index, product)
                }
                onDelete={() => handleDeleteHDDFromSimulation(index)}
              />
            </div>
          ))}
        </div>

        {/* Buttons to Add New SSD and HDD */}
        <button
          onClick={addNewSSD}
          className="mt-4 py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition mx-2"
        >
          Tambah SSD
        </button>

        <button
          onClick={addNewHDD}
          className="mt-4 py-2 px-4 bg-green-900 text-white rounded-lg hover:bg-green-950 transition mx-2"
        >
          Tambah HDD
        </button>
      </CardContent>
    </Card>
  );
}
