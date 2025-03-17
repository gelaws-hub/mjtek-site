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
import { useRefreshContext } from "@/lib/refreshContext";
import { errorToast } from "@/components/toast/reactToastify";
import { useRouter } from "next/navigation";
import { Form, useFormik } from "formik";

interface UserAddress {
  name: string;
  address: string;
  email: string;
  phone_number: string;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
}

export function ConfirmAddressDialog({ open, setOpen, data }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress, setUserAddress] = useState<UserAddress>();
  const router = useRouter();

  const fetchAddress = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/address`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (response.status === 401) {
        errorToast("Anda harus login terlebih dahulu", "top-left");
        router.push("/login?callbackUrl=/simulation");
        return;
      }
      const data = await response.json();
      setUserAddress(data);
    } catch (error) {
      console.error("Error fetching address:", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAddress();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80%] max-w-[95%] overflow-y-auto rounded-md bg-inherit scrollbar-thin md:w-[80%] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi alamat</DialogTitle>
          <DialogDescription className="text-left">
            Pastikan alamat yang tertera berikut sudah sesuai sebelum anda melakukan transaksi produk ini
          </DialogDescription>
          <form>
            <Input value={isLoading ? "Loading..." : userAddress?.name} disabled />
            <Input value={isLoading ? "Loading..." : userAddress?.address} disabled />
            <Input value={isLoading ? "Loading..." : userAddress?.email} disabled />
            <Input value={isLoading ? "Loading..." : userAddress?.phone_number} disabled />    
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}