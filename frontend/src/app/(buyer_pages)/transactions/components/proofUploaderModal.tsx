import { Transaction } from "@/types/transaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ImageUploader } from "@/components/image-uploader";

export default function ProofUploaderModal({ onSubmit, onClose, openState }: any) {
  return (
    <Dialog open={openState} onOpenChange={onClose}>
      <DialogContent className="border-none p-2">
        <imgUploader onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
