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

export default function DeleteAlert({
  children,
  actionComponent,
  action,
  deleteMessage = "Apakah anda yakin akan menghapus ini?",
}: {
  children: React.ReactNode;
  actionComponent: React.ReactNode;
  action: () => void;
  deleteMessage?: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-inherit dark:bg-gray-800 dark:text-slate-50">
        <AlertDialogHeader>
          <AlertDialogTitle>Anda sangat yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            <span dangerouslySetInnerHTML={{ __html: deleteMessage }} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-slate-600">Cancel</AlertDialogCancel>
          <AlertDialogAction className="hover:bg-red-600" onClick={action}>
            {actionComponent}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
