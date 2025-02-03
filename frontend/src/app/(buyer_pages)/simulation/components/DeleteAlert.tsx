import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DeleteAlertProps {
  open: boolean;
  onDelete: () => void;
  onCancel: () => void;
  className?: string
  message?: string
}

export function DeleteAlert({ onDelete, onCancel, open, className, message = "" }: DeleteAlertProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
      </AlertDialogTrigger>
      <AlertDialogContent className={cn("bg-inherit dark:bg-gray-800 dark:text-slate-50",className)}>
        <AlertDialogHeader>
          <AlertDialogTitle>Apa anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            {message ? message : "Data yang dihapus tidak dapat dikembalikan lagi"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
