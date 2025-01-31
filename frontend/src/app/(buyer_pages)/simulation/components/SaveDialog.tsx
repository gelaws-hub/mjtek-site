import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { SaveCollapsible } from "./SaveCollapsible";
import { useRefreshContext } from "@/lib/refreshContext";

interface Simulations {
  id: string;
  title: string;
  user_id: string;
  user: {
    name: string;
  };
  description: string;
  modifiedAt: string;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  simData: any;
}

export function SaveSimulationDialog({ open, setOpen, simData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [simulations, setSimulations] = useState<Simulations[]>();
  const [refresh] = useRefreshContext();

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

  useEffect(() => {
    fetchSimulation();
  }, [refresh]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80%] max-w-[95%] overflow-y-auto rounded-md bg-inherit scrollbar-thin md:w-[80%] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Simpan Simulasi</DialogTitle>
          <DialogDescription className="text-left">
            Anda dapat menyimpan maksimal 3 simulasi. Silahkan pilih slot
            simulasi yang ingin anda gunakan untuk menyimpan.
          </DialogDescription>
        </DialogHeader>
        {simulations
          ? simulations.map((sim) => (
              <SaveCollapsible
                onSave={() => setOpen(false)}
                key={sim.id}
                simInfo={sim}
                simData={simData}
              />
            ))
          : "Belum ada simulasi tersimpan"}
        {simulations && simulations.length < 3 && (
          <SaveCollapsible
            simData={simData}
            simInfo={{
              id: "",
              title: "",
              description: "",
            }}
            onSave={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
