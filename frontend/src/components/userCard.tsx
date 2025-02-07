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
import { User } from "lucide-react";
import { toast } from "react-toastify";

interface UserData {
  id: string;
  role_name: string;
  name: string;
  email: string;
  password?: string;
  address?: string;
  phone_number?: string;
  profile_pic?: string;
}

export default function UserCard({
  btnTrigger,
  userData,
  onLogout,
  logoutLoading,
}: {
  btnTrigger: React.ReactNode;
  userData: UserData;
  onLogout?: () => void;
  logoutLoading?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState<{
    name: boolean;
    phone_number: boolean;
    address: boolean;
  }>({
    name: false,
    phone_number: false,
    address: false,
  });

  const [tempUserData, setTempUserData] = useState({
    name: userData.name,
    phone_number: userData.phone_number,
    address: userData.address,
  });

  const [tempAddress, setTempAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profile_pic", file);
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userData.id}/upload-profile-picture`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        toast.success("Foto profil berhasil diunggah!");
        window.location.reload();
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Gagal mengunggah foto profil.");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof tempUserData, value: string) => {
    setTempUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: keyof typeof tempAddress, value: string) => {
    setTempAddress((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async (field: keyof typeof tempUserData) => {
    if (!tempUserData[field]?.trim()) {
      toast.error("Input tidak boleh kosong.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userData.id}/edit-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ [field]: tempUserData[field] }),
      });
      if (response.ok) {
        toast.success("Data berhasil diperbarui!");
        setEditMode((prev) => ({ ...prev, [field]: false }));
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Gagal memperbarui data.");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const saveAddressChanges = async () => {
    const { street, city, state, postalCode, country } = tempAddress;
    if (!street || !city || !state || !postalCode || !country) {
      toast.error("Semua field alamat wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userData.id}/edit-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ address: `${street}, ${city}, ${state}, ${postalCode}, ${country}` }),
      });
      if (response.ok) {
        toast.success("Alamat berhasil diperbarui!");
        setEditMode((prev) => ({ ...prev, address: false }));
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Gagal memperbarui alamat.");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/change-password`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Email untuk ganti password telah dikirim!");
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Gagal mengirim email ganti password.");
      }
    } catch (error: any) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{btnTrigger}</DialogTrigger>
      <DialogContent className="w-[90%] max-w-md rounded-md bg-inherit" >
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
            {/* <Button asChild variant="outline" className="w-full max-w-[200px]">
              <label htmlFor="upload-photo">
                {loading ? "Uploading..." : "Choose Photo"}
                <input
                  id="upload-photo"
                  type="file"
                  accept="image/jpeg, image/png"
                  className="hidden-input"
                  onChange={handleProfilePictureChange}
                />
              </label>
            </Button> */}
          </div>
          <div className="space-y-4">
            {["name", "phone_number"].map((field) => (
              <div key={field} className="flex items-center justify-between">
                <span className="text-muted-foreground capitalize">{field.replace("_", " ")}</span>
                <div className="flex items-center gap-2">
                  {editMode[field as keyof typeof tempUserData] ? (
                    <>
                      <input
                        type="text"
                        value={tempUserData[field as keyof typeof tempUserData]}
                        onChange={(e) => handleInputChange(field as keyof typeof tempUserData, e.target.value)}
                        className="border rounded px-2 py-1"
                        placeholder={field.replace("_", " ")}
                      />
                      <Button
                        variant="link"
                        className="h-auto p-0 text-primary"
                        onClick={() => saveChanges(field as keyof typeof tempUserData)}
                        disabled={loading}
                      >
                        Simpan
                      </Button>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-primary"
                        onClick={() => setEditMode((prev) => ({ ...prev, [field]: false }))}
                      >
                        Batal
                      </Button>
                    </>
                  ) : (
                    <>
                      <span>{tempUserData[field as keyof typeof tempUserData]}</span>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-primary"
                        onClick={() => setEditMode((prev) => ({ ...prev, [field]: true }))}
                      >
                        Ganti
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div>
              <span className="text-muted-foreground">Alamat</span>
              {editMode.address ? (
                <div className="space-y-2 mt-2">
                  {["street", "city", "state", "postalCode", "country"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      value={tempAddress[field as keyof typeof tempAddress]}
                      onChange={(e) => handleAddressChange(field as keyof typeof tempAddress, e.target.value)}
                      className="border w-full rounded px-2 py-1"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  ))}
                  <div className="flex gap-2">
                    <Button onClick={saveAddressChanges} disabled={loading}>
                      Simpan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditMode((prev) => ({ ...prev, address: false }))}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span>{tempUserData.address}</span>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-primary"
                    onClick={() => setEditMode((prev) => ({ ...prev, address: true }))}
                  >
                    Ganti
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{userData.email}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleChangePassword}
              disabled={loading}
            >
              {loading ? "Processing..." : "Ganti Password"}
            </Button>
            <Button onClick={onLogout} variant="outline" className="w-full" disabled={logoutLoading}>
              {logoutLoading ? "Loading..." : "Logout"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
