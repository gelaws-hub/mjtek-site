"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainComponentSim from "./components/MainComponentSim";
import useCheckSession from "@/app/(authentication)/auth/useCheckSession";
import { Search01Icon } from "@/components/icons/Search01Icon";
import { SimMeta } from "./components/Interfaces";
import { successToast } from "@/components/toast/reactToastify";
import { DeleteIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { DeletePutBackIcon } from "@/components/icons/DeletePutBackIcon";
import { DeleteAlert } from "./components/DeleteAlert";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRefreshContext, RefreshContext } from "@/lib/refreshContext";

export default function Simulasi() {
  const [refresh, setRefresh] = useState(false);
  const [simulationId, setSimulationId] = useState("");
  const { isAuthenticated, user } = useCheckSession();
  const [isLoading, setIsLoading] = useState(true);
  const [simulations, setSimulations] = useState<SimMeta[]>([]);
  const [deleteModal, setDeleteModal] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const simIdParams = searchParams.get("id");

  const handleNavigate = () => {
    if (simulationId) {
      router.push(`/simulation?id=${simulationId}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNavigate();
    }
  };

  const fetchSimulation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/simulations?onlyInfo=true`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      setSimulations(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching simulation:", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/simulation/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await response.json();
      setDeleteModal("");
      if (response.ok) {
        successToast(
          `Simulasi ${data.simulation.id} berhasil dihapus`,
          "top-left",
        );
        if (simIdParams == id) {
          router.push("/simulation");
        }
        fetchSimulation();
      }
      setRefresh((refresh) => !refresh);
    } catch (error) {
      setDeleteModal("");
      setRefresh((refresh) => !refresh);
      console.error("Error deleting simulation:", error);
    }
    setDeleteModal("");
  };

  useEffect(() => {
    setSimulationId(simIdParams ?? "");
    if (isAuthenticated) {
      fetchSimulation();
    }
    setIsLoading(false);
  }, [isAuthenticated, refresh]);

  return (
    <RefreshContext.Provider value={[refresh, setRefresh]}>
      <div className="container mx-auto min-h-screen py-4">
        <DeleteAlert
          onDelete={() => handleDelete(deleteModal)}
          onCancel={() => setDeleteModal("")}
          open={deleteModal !== ""}
        />
        <h1 className="text-2xl font-bold">Simulasi rakit PC</h1>
        <Card className="mb-4 flex flex-col gap-2 p-4">
          <CardHeader className="relative flex flex-row items-center justify-center p-2">
            <input
              value={simulationId}
              type="text"
              placeholder="Cari Simulasi berdasarkan ID"
              onKeyDown={handleKeyDown}
              onChange={(e) => setSimulationId(e.target.value)}
              className="h-full w-full rounded-md border p-2 pl-10"
            />
            <button
              className="absolute left-4 rounded-md"
              onClick={handleNavigate}
              style={{ margin: 0 }}
            >
              <Search01Icon className="text-gray-700" />
            </button>
          </CardHeader>
          <CardContent className="overflow-x-auto p-2 scrollbar-thin">
            <div className="flex gap-2">
              <button
                key="lokal"
                className={`h-10 cursor-pointer rounded-md border p-2 px-4 ${simIdParams ? "hover:bg-gray-200" : "bg-blue-900 text-white hover:bg-blue-700"}`}
                onClick={() => {
                  setSimulationId("");
                  router.push(`/simulation`);
                }}
              >
                Lokal
              </button>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : isAuthenticated && user.role_name === "buyer" ? (
                simulations.map((simulation: any) => (
                  <div
                    className="flex h-10 rounded-md border"
                    key={simulation.id}
                  >
                    <div
                      className={`flex cursor-pointer rounded-l-md p-2 px-4 ${
                        simIdParams === simulation.id
                          ? "bg-blue-900 text-white hover:bg-blue-700"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSimulationId(simulation.id);
                        router.push(`/simulation?id=${simulation.id}`);
                      }}
                    >
                      {simulation.id}
                    </div>
                    <button
                      className="rounded-md rounded-l-none rounded-r-md bg-red-500 p-2 hover:bg-red-400"
                      onClick={() => setDeleteModal(simulation.id)}
                    >
                      <DeletePutBackIcon className="h-5 w-5 text-white" />
                    </button>
                  </div>
                ))
              ) : (
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(`/simulation${simulationId ? `?id=${simulationId}` : ""}`)}`}
                  className="h-10 cursor-pointer rounded-md border bg-blue-900 p-2 px-4 text-white hover:bg-blue-700"
                >
                  Silahkan Login
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
        <MainComponentSim />
      </div>
    </RefreshContext.Provider>
  );
}
