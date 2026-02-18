import { useDeleteItem } from '../../../hooks/useQueries';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { BackpackItem } from '../../../backend';

interface DeleteItemDialogProps {
  item: BackpackItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteItemDialog({ item, open, onOpenChange }: DeleteItemDialogProps) {
  const { mutate: deleteItem, isPending } = useDeleteItem();

  const handleDelete = () => {
    deleteItem(item.id, {
      onSuccess: () => {
        toast.success('Item removed from backpack');
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(`Failed to delete item: ${error.message}`);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove <strong>{item.name}</strong> from your backpack? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
