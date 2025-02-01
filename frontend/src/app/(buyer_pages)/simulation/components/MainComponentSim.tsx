"use client";

import { useState, useEffect } from "react";
import ComponentSelection from "./ComponentSelection";
import { Card, CardContent } from "@/components/ui/card";
import { Product, SimData } from "./Interfaces";
import { Button } from "@/components/ui/button";
import { DeletePutBackIcon } from "@/components/icons/DeletePutBackIcon";
import { Share01Icon } from "@/components/icons/Share01Icon";
import { successToast } from "@/components/toast/reactToastify";
import { useRouter, useSearchParams } from "next/navigation";
import { SimMeta } from "./Interfaces";
import { Skeleton } from "@/components/ui/skeleton";
import { CollapsibleInfo } from "./CollapsibleInfo";
import { SaveSimulationDialog } from "./SaveDialog";
import { useRefreshContext } from "@/lib/refreshContext";
import { SaveIcon } from "lucide-react";
import { DeleteAlert } from "./DeleteAlert";

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

export default function MainComponentSim({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const simId = searchParams.get("id");

  const [selectedComponents, setSelectedComponents] = useState<SimData>({
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
  const [simMeta, setSimMeta] = useState<SimMeta>();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [refresh] = useRefreshContext();
  const [loadingSockets, setLoadingSockets] = useState(true);

  // Initial Fetch to all sockets
  const fetchAllSockets = async () => {
    setLoadingSockets(true);
    try {
      const cachedSockets = sessionStorage.getItem("allSockets");
      if (cachedSockets) {
        setAllSockets(JSON.parse(cachedSockets));
        setLoadingSockets(false);
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/socket`,
        );
        const data = await response.json();
        setAllSockets(data.sockets);
        sessionStorage.setItem("allSockets", JSON.stringify(data.sockets));
        setLoadingSockets(false);
      }
    } catch (error) {
      console.error("Error fetching sockets:", error);
      setLoadingSockets(false);
    }
    setLoadingSockets(false);
  };

  useEffect(() => {
    fetchAllSockets();
  }, []);

  // Initial load selected components from local storage
  useEffect(() => {
    fetchAllSockets();
    if (simId) {
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/simulation/${simId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // successToast("Simulasi berhasil diambil", "top-left");
            return response.json();
          } else {
            throw new Error("Failed to fetch simulation data");
          }
        })
        .then((data) => {
          setSimMeta(data);
          setSelectedComponents(data.simulation_data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching simulation data:", error);
          setIsLoading(false);
        });
    } else {
      const storedData = localStorage.getItem("simulationData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (!parsedData.Mobo) {
          delete parsedData.Ram;
        }
        setSelectedComponents(parsedData);
        setSimMeta(undefined);
      }
      // fetchAllSockets().then(() => setIsLoading(false));
      setIsLoading(false);
    }
  }, [simId, refresh]);

  // Save selected components to local storage
  useEffect(() => {
    if (!isLoading && !simId) {
      localStorage.setItem(
        "simulationData",
        JSON.stringify(selectedComponents),
      );
    }
  }, [selectedComponents, isLoading, simId]);

  // Filter sockets based on selected brand
  useEffect(() => {
    if (selectedComponents.Brand && allSockets) {
      const filteredSockets = allSockets.filter(
        (socket) =>
          socket.brand.brand_name.toLowerCase() === selectedComponents.Brand,
      );
      setSockets(filteredSockets);
    } else {
      setSockets([]);
    }
  }, [selectedComponents.Brand, allSockets]);

  const handleComponentChange = (
    componentType: keyof typeof selectedComponents,
    product: Product | null,
  ) => {
    setSelectedComponents((prev) => ({ ...prev, [componentType]: product }));
  };

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
        (_, i) => i !== index,
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

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6">
        {simMeta && (
          <Card>
            <Skeleton className="h-[130px] w-full" />
          </Card>
        )}
        <Card>
          <Skeleton className="h-[160px] w-full" />
        </Card>
        <Card>
          <Skeleton className="h-[800px] w-full" />
        </Card>
        <Card>
          <Skeleton className="h-[250px] w-full" />
        </Card>
        <Card>
          <Skeleton className="h-[500px] w-full" />
        </Card>
        <Card className="sticky bottom-0 mt-8">
          <Skeleton className="h-[96px] w-full" />
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      {isSaveModalOpen && (
        <SaveSimulationDialog
          open={isSaveModalOpen}
          setOpen={setIsSaveModalOpen}
          simData={selectedComponents}
        />
      )}
      {simMeta && (
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-2 text-base font-semibold md:mb-4 md:text-lg">
              Informasi Simulasi
            </h2>
            <CollapsibleInfo
              title={simMeta?.title ?? ""}
              description={simMeta?.description ?? ""}
              user={simMeta?.user?.name ?? ""}
            />
          </CardContent>
        </Card>
      )}
      {/* Processor Configuration */}
      <Card>
        <CardContent className="p-6">
          <h2 className="mb-2 text-base font-semibold md:mb-4 md:text-lg">
            Konfigurasi Processor
          </h2>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
            <div className="space-y-2">
              <label
                htmlFor="processor"
                className="text-sm font-medium md:text-base"
              >
                Brand CPU
              </label>
              <select
                id="processor"
                className="bg-background w-full rounded-md border p-2 text-sm md:text-base"
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
                    Ram: null,
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
                className="text-sm font-medium md:text-base"
              >
                Socket
              </label>
              <select
                disabled={loadingSockets}
                id="socket"
                className="bg-background w-full rounded-md border p-2 text-sm md:text-base"
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedComponents((prev) => ({
                    ...prev,
                    SocketId: value === "" ? null : value,
                    CPU: null,
                    Mobo: null,
                    Ram: null,
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
            <h2 className="mb-4 text-base font-semibold md:text-xl">
              Komponen utama
            </h2>
            <div className="space-y-4">
              {/* CPU */}
              <div className="">
                <h3 className="text-sm font-semibold text-gray-700 md:mb-2 md:text-lg">
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
                <h3 className="text-sm font-semibold text-gray-700 md:mb-2 md:text-lg">
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
                <h3 className="text-sm font-semibold text-gray-700 md:mb-2 md:text-lg">
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
                <h3 className="text-sm font-semibold text-gray-700 md:mb-2 md:text-lg">
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
          <CardContent className="flex  flex-col p-6">
            <h2 className="mb-4 text-base font-semibold md:text-xl">Storage</h2>
            <div className="space-y-4">
              {/* Storage */}
              <div className=" mb-4">
                {selectedComponents?.Storage?.map((ssd, index) => (
                  <div
                    key={ssd.key}
                    className="mt-4 flex flex-row justify-evenly"
                  >
                    <div className="w-full flex-1">
                      <h3 className="mb-2 text-lg font-semibold text-gray-700">
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
                        className="text-whitetransition mx-2 mt-auto rounded-lg bg-red-600 p-3 hover:bg-red-500"
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
              className="mx-2 ml-auto mt-2 rounded-lg bg-blue-900 px-4 py-2 text-white transition hover:bg-blue-950"
            >
              Tambah Storage
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-2 text-base font-semibold md:mb-4 md:text-lg">
              Komponen lain
            </h2>
            <div className="space-y-4">
              {/* Casing */}
              <div className="">
                <h3 className="text-sm font-semibold text-gray-700 md:mb-2 md:text-lg">
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
                <h3 className="text-sm font-semibold text-gray-700 md:mb-2 md:text-lg">
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
                <h3 className="text-sm font-semibold text-gray-700 md:mb-2 md:text-lg">
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
                <h3 className="text-sm font-semibold text-gray-700 md:mb-2 md:text-lg">
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
              <h3 className="text-sm font-semibold text-gray-700 md:mb-2 md:text-lg">
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.8rem] font-semibold md:text-lg">
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
                        0,
                      ),
                    )}
                  </span>
                </p>
                <p className="text-muted-foreground text-xs md:text-sm">
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
                      0,
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
                {isAuthenticated && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      successToast("berhasil disalin", "top-left");
                    }}
                    className="min-w-12"
                  >
                    <Share01Icon />
                    <span className="hidden md:inline">Bagikan</span>
                  </Button>
                )}
                <Button
                  onClick={() => setIsSaveModalOpen(true)}
                  variant="default"
                  className="min-w-12 bg-blue-950 text-slate-100"
                >
                  <SaveIcon className="text-slate-100" />
                  <span className="hidden md:inline">Simpan</span>
                </Button>
                <DeleteAlert
                  onDelete={handleConfirmReset}
                  onCancel={() => setIsDeleteModalOpen(false)}
                  open={isDeleteModalOpen}
                  message="Apakah anda yakin untuk me-reset Simulasi ini?"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
