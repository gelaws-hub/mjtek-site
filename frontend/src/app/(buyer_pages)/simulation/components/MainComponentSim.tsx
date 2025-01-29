"use client";

import { useState, useEffect } from "react";
import ComponentSelection from "./ComponentSelection";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "./Interfaces";
import { Button } from "@/components/ui/button";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { DeletePutBackIcon } from "@/components/icons/DeletePutBackIcon";
import { Share01Icon } from "@/components/icons/Share01Icon";
import { ViewIcon } from "@/components/icons/ViewIcon";

interface Socket {
  id: number;
  socket_name: string;
  brand_id: number;
  brand: {
    brand_name: string;
  };
}

interface StorageDevice {
  key: string;
  product: Product | null;
}

export default function MainComponentSim() {
  const [selectedComponents, setSelectedComponents] = useState({
    CPU: null as Product | null,
    Mobo: null as Product | null,
    Ram: null as Product | null,
    Vga: null as Product | null,
    SocketId: null as string | null,
    Brand: null as string | null,
    Storage: [{ key: "", product: null as Product | null }] as
      | StorageDevice[]
      | null,
    Casing: null as Product | null,
    PSU: null as Product | null,
    Monitor1: null as Product | null,
    Monitor2: null as Product | null,
    Monitor3: null as Product | null,
  });
  const [allSockets, setAllSockets] = useState<Socket[]>([]);
  const [sockets, setSockets] = useState<Socket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Initial Fetch to all sockets
  const fetchAllSockets = async () => {
    try {
      const cachedSockets = sessionStorage.getItem("allSockets");
      if (cachedSockets) {
        setAllSockets(JSON.parse(cachedSockets));
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/socket`
        );
        const data = await response.json();
        setAllSockets(data.sockets);
        sessionStorage.setItem("allSockets", JSON.stringify(data.sockets));
      }
    } catch (error) {
      console.error("Error fetching sockets:", error);
    }
  };

  // Initial load selected components from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("simulationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (!parsedData.Mobo) {
        delete parsedData.Ram;
      }
      setSelectedComponents(parsedData);
    }
    fetchAllSockets().then(() => setIsLoading(false));
  }, []);

  // Save selected components to local storage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(
        "simulationData",
        JSON.stringify(selectedComponents)
      );
    }
  }, [selectedComponents, isLoading]);

  // Filter sockets based on selected brand
  useEffect(() => {
    if (selectedComponents.Brand && allSockets.length > 0) {
      const filteredSockets = allSockets.filter(
        (socket) =>
          socket.brand.brand_name.toLowerCase() === selectedComponents.Brand
      );
      setSockets(filteredSockets);
    } else {
      setSockets([]);
    }
  }, [selectedComponents.Brand, allSockets]);

  const handleComponentChange = (
    componentType: keyof typeof selectedComponents,
    product: Product | null
  ) => {
    setSelectedComponents((prev) => ({ ...prev, [componentType]: product }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleResetClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmReset = () => {
    setSelectedComponents({
      CPU: null,
      Mobo: null,
      Ram: null,
      Vga: null,
      SocketId: null,
      Brand: null,
      Storage: null,
      Casing: null,
      PSU: null,
      Monitor1: null,
      Monitor2: null,
      Monitor3: null,
    });
    setIsDeleteModalOpen(false);
  };

  const handleAddStorageToSimulation = (index: number, product: Product) => {
    setSelectedComponents((prevComponents) => {
      const updatedStorage = [...(prevComponents.Storage || [])];
      updatedStorage[index].product = product;
      return { ...prevComponents, Storage: updatedStorage };
    });
  };

  const handleDeleteStorageFromSimulation = (index: number) => {
    setSelectedComponents((prevComponents) => {
      const updatedStorage = (prevComponents.Storage || []).filter(
        (_, i) => i !== index
      );
      return {
        ...prevComponents,
        Storage: updatedStorage.map((Storage, idx) => ({
          ...Storage,
          key: `${idx + 1}`,
        })),
      };
    });
  };

  const addNewStorage = () => {
    setSelectedComponents((prevComponents) => ({
      ...prevComponents,
      Storage: [
        ...(prevComponents.Storage ?? []),
        {
          key: `${(prevComponents.Storage?.length ?? 0) + 1}`,
          product: null,
        },
      ],
    }));
  };

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-bold">PC Simulation</h1>

      {/* Processor Configuration */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">
            Konfigurasi Processor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <div className="space-y-2">
              <label
                htmlFor="processor"
                className="text-sm md:text-base font-medium"
              >
                Brand CPU
              </label>
              <select
                id="processor"
                className="w-full p-2 border rounded-md bg-background text-sm md:text-base"
                onChange={(e) => {
                  setSelectedComponents((prev) => ({
                    ...prev,
                    Brand: e.target.value === "" ? null : e.target.value,
                  }));
                  setSelectedComponents((prev) => ({
                    ...prev,
                    SocketId: null,
                    CPU: null,
                    Mobo: null,
                    Ram: null
                  }));
                }}
                value={selectedComponents.Brand ?? ""}
              >
                <option value="">Pilih Brand CPU</option>
                <option value="intel">Intel</option>
                <option value="amd">AMD</option>
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="socket"
                className="text-sm md:text-base font-medium"
              >
                Socket
              </label>
              <select
                id="socket"
                className="w-full p-2 border rounded-md bg-background text-sm md:text-base"
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedComponents((prev) => ({
                    ...prev,
                    SocketId: value === "" ? null : value,
                    CPU: null,
                    Mobo: null,
                    Ram: null
                  }));
                }}
                value={selectedComponents.SocketId ?? ""}
              >
                <option value="">Pilih Socket</option>
                {sockets.map((socket) => (
                  <option key={socket.id} value={socket.id}>
                    {socket.socket_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Sections */}
      <div className="space-y-6">
        {/* Main Components */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-base md:text-xl font-semibold mb-4">
              Komponen utama
            </h2>
            <div className="space-y-4">
              {/* CPU */}
              <div className="">
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 md:mb-2">
                  Pilih CPU
                </h3>
                <ComponentSelection
                  initialProduct={selectedComponents.CPU}
                  categoryId="1"
                  socketId={selectedComponents.SocketId}
                  ramTypeId=""
                  onAddToSimulation={(product) =>
                    handleComponentChange("CPU", product)
                  }
                  onDelete={() => handleComponentChange("CPU", null)}
                />
              </div>
              {/* Motherboard */}
              <div className="">
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 md:mb-2">
                  Pilih Motherboard
                </h3>
                <ComponentSelection
                  initialProduct={selectedComponents.Mobo}
                  categoryId="4"
                  socketId={selectedComponents.SocketId}
                  ramTypeId=""
                  onAddToSimulation={(product) =>
                    handleComponentChange("Mobo", product)
                  }
                  onDelete={() => {
                    handleComponentChange("Mobo", null);
                    handleComponentChange("Ram", null);
                  }}
                />
              </div>
              {/* RAM */}
              <div className="">
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 md:mb-2">
                  Pilih RAM
                </h3>
                <ComponentSelection
                  initialProduct={selectedComponents.Ram}
                  categoryId="2"
                  socketId=""
                  ramTypeId={
                    selectedComponents.Mobo?.ram_type
                      ? selectedComponents.Mobo.ram_type
                          .map((ram: any) => ram.id)
                          .join(",")
                      : undefined
                  }
                  onAddToSimulation={(product) =>
                    handleComponentChange("Ram", product)
                  }
                  onDelete={() => handleComponentChange("Ram", null)}
                />
              </div>
              {/* VGA */}
              <div className="">
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 md:mb-2">
                  Pilih VGA
                </h3>
                <ComponentSelection
                  initialProduct={selectedComponents.Vga}
                  categoryId="3"
                  socketId=""
                  ramTypeId=""
                  onAddToSimulation={(product) =>
                    handleComponentChange("Vga", product)
                  }
                  onDelete={() => handleComponentChange("Vga", null)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage */}
        <Card>
          <CardContent className="p-6  flex flex-col">
            <h2 className="text-base md:text-xl font-semibold mb-4">Storage</h2>
            <div className="space-y-4">
              {/* Storage */}
              <div className=" mb-4">
                {selectedComponents?.Storage?.map((ssd, index) => (
                  <div
                    key={ssd.key}
                    className="mt-4 flex flex-row justify-evenly"
                  >
                    <div className="w-full flex-1">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Pilih Storage {ssd.key}
                      </h3>
                      <ComponentSelection
                        initialProduct={ssd.product}
                        categoryId="6,7"
                        socketId=""
                        ramTypeId=""
                        onAddToSimulation={(product) =>
                          handleAddStorageToSimulation(index, product)
                        }
                        onDelete={() =>
                          handleDeleteStorageFromSimulation(index)
                        }
                      />
                    </div>
                    {ssd.product === null && (
                      <Button
                        className="p-3 text-whitetransition mx-2 mt-auto rounded-lg"
                        onClick={() => handleDeleteStorageFromSimulation(index)}
                        variant="destructive"
                      >
                        <DeletePutBackIcon color="white" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={addNewStorage}
              className="mt-2 py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition mx-2 ml-auto"
            >
              Tambah Storage
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4">
              Komponen lain
            </h2>
            <div className="space-y-4">
              {/* Casing */}
              <div className="">
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 md:mb-2">
                  Pilih Casing
                </h3>
                <ComponentSelection
                  initialProduct={selectedComponents.Casing}
                  categoryId="8"
                  socketId=""
                  ramTypeId=""
                  onAddToSimulation={(product) =>
                    handleComponentChange("Casing", product)
                  }
                  onDelete={() => handleComponentChange("Casing", null)}
                />
              </div>
              {/* PSU */}
              <div className="">
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 md:mb-2">
                  Pilih Power Supply Unit (PSU)
                </h3>
                <ComponentSelection
                  initialProduct={selectedComponents.PSU}
                  categoryId="9"
                  socketId=""
                  ramTypeId=""
                  onAddToSimulation={(product) =>
                    handleComponentChange("PSU", product)
                  }
                  onDelete={() => handleComponentChange("PSU", null)}
                />
              </div>
              {/* Monitor 1 */}
              <div className="">
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 md:mb-2">
                  Pilih Monitor 1
                </h3>
                <ComponentSelection
                  initialProduct={selectedComponents.Monitor1}
                  categoryId="5"
                  socketId=""
                  ramTypeId=""
                  onAddToSimulation={(product) =>
                    handleComponentChange("Monitor1", product)
                  }
                  onDelete={() => handleComponentChange("Monitor1", null)}
                />
              </div>
              {/* Monitor 2 */}
              <div className="">
                <h3 className="text-sm md:text-lg font-semibold text-gray-700 md:mb-2">
                  Pilih Monitor 2
                </h3>
                <ComponentSelection
                  initialProduct={selectedComponents.Monitor2}
                  categoryId="5"
                  socketId=""
                  ramTypeId=""
                  onAddToSimulation={(product) =>
                    handleComponentChange("Monitor2", product)
                  }
                  onDelete={() => handleComponentChange("Monitor2", null)}
                />
              </div>
            </div>
            {/* Monitor 3 */}
            <div className="">
              <h3 className="text-sm md:text-lg font-semibold text-gray-700 md:mb-2">
                Pilih Monitor 3
              </h3>
              <ComponentSelection
                initialProduct={selectedComponents.Monitor3}
                categoryId="5"
                socketId=""
                ramTypeId=""
                onAddToSimulation={(product) =>
                  handleComponentChange("Monitor3", product)
                }
                onDelete={() => handleComponentChange("Monitor3", null)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="sticky bottom-0 mt-8 bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[0.8rem] md:text-lg font-semibold">
                  <span className="block md:inline">
                    {" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      Object.values(selectedComponents).reduce(
                        (acc, component) => {
                          if (Array.isArray(component)) {
                            // component is an array of StorageDevice objects
                            return (
                              acc +
                              component.reduce((acc, storageDevice) => {
                                if (
                                  storageDevice.product &&
                                  storageDevice.product.price
                                ) {
                                  return acc + storageDevice.product.price;
                                }
                                return acc;
                              }, 0)
                            );
                          } else if (
                            component &&
                            typeof component === "object" &&
                            "price" in component
                          ) {
                            // component is a Product object
                            return acc + component.price;
                          }
                          return acc;
                        },
                        0
                      )
                    )}
                  </span>
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Jumlah komponen:{" "}
                  <span>
                    {Object.values(selectedComponents).reduce(
                      (acc, component) => {
                        if (Array.isArray(component)) {
                          // component is an array of StorageDevice objects
                          return (
                            acc +
                            component.reduce((acc, storageDevice) => {
                              if (
                                storageDevice.product &&
                                storageDevice.product !== null
                              ) {
                                return acc + 1;
                              }
                              return acc;
                            }, 0)
                          );
                        } else if (
                          component &&
                          typeof component === "object" &&
                          component !== null
                        ) {
                          // component is a Product object
                          return acc + 1;
                        }
                        return acc;
                      },
                      0
                    )}
                  </span>
                </p>
              </div>
              <div className="flex gap-1 ">
                <Button
                  variant="outline"
                  onClick={handleResetClick}
                  className="min-w-12"
                >
                  <DeletePutBackIcon />
                  <span className="hidden md:inline">Reset</span>
                </Button>
                <Button variant="outline" className="min-w-12">
                  <ViewIcon />
                  <span className="hidden md:inline">Preview</span>
                </Button>
                <Button
                  variant="default"
                  className="bg-blue-950 min-w-12 text-slate-100"
                >
                  <Share01Icon className="text-slate-100" />
                  <span className="hidden md:inline">Simpan</span>
                </Button>
                <DeleteConfirmModal
                  isOpen={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                  onConfirm={handleConfirmReset}
                  message="Apakah anda yakin untuk menghapus Simulasi ini?"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
