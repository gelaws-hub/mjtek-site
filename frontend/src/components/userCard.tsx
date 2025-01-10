import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import { toast } from "react-toastify"; // Gunakan library untuk notifikasi

interface UserData {
  id: string;
  role_name: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
  profile_pic: string;
}

export default function UserCard({
  btnTrigger,
  userData,
  onLogout,
}: {
  btnTrigger: React.ReactNode;
  userData: UserData;
  onLogout?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      console.log("Mengirim permintaan ke backend..."); // Debug log
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/change-password`, {
        method: "POST",
        credentials: "include",
      });
  
      if (response.ok) {
        const responseData = await response.json(); // Parse the response data as JSON
        console.log("Respons dari backend:", responseData); // Debug log
        toast.success("Email untuk ganti password telah dikirim!");
      } else {
        const errorResponse = await response.json();
        console.error("Error dari backend:", errorResponse); // Debug log
        toast.error(errorResponse.message || "Gagal mengirim email ganti password.");
      }
    } catch (error: any) {
      console.error("Error dari backend:", error.response?.data || error.message); // Debug log
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{btnTrigger}</DialogTrigger>
      <DialogContent className="w-[90%] max-w-md rounded-md bg-inherit">
        <DialogHeader>
          <DialogTitle>Biodata Diri</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={userData.profile_pic} alt="Profile picture" />
              <AvatarFallback>
                <User className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="w-full max-w-[200px]">
              Choose Photo
            </Button>
            <p className="text-muted-foreground text-center text-xs">
              Besar file: maksimum 1 MB. Ekstensi file yang diperbolehkan: JPG,
              JPEG, PNG
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Nama</span>
              <div className="flex items-center gap-2">
                <span>{userData.name}</span>
                <Button variant="link" className="h-auto p-0 text-primary">
                  Ganti
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <div className="flex items-center gap-2">
                <span>{userData.email}</span>
                <Button variant="link" className="h-auto p-0 text-primary">
                  Ganti Email
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Nomor Telepon</span>
              <div className="flex items-center gap-2">
                <span>{userData.phone_number}</span>
                <Badge
                  variant="outline"
                  className="border-blue-200 bg-blue-50 text-blue-700"
                >
                  Verified
                </Badge>
                <Button variant="link" className="h-auto p-0 text-primary">
                  Change
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Alamat</span>
              <div className="flex items-center gap-2">
                <span>{userData.address}</span>
                <Button variant="link" className="h-auto p-0 text-primary">
                  Change
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleChangePassword}
              disabled={loading}
            >
              {loading ? "Processing..." : "Change Password"}
            </Button>
            <Button onClick={onLogout} variant="outline" className="w-full">
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
