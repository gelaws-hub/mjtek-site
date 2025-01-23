import { Bounce, toast, ToastPosition } from "react-toastify";

export const successToast = (message = "Berhasil", position: ToastPosition = "bottom-right") =>
  toast.success(message, {
    position: position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

export const errorToast = (message: string, position: ToastPosition = "bottom-right") =>
  toast.error(message, {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

export const deleteToast = (message = "Produk berhasil dihapus", position: ToastPosition = "bottom-right") =>
  toast.success(message, {
    position: position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
