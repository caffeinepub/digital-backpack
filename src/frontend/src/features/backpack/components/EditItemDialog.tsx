import { useState, useEffect } from 'react';
import { useUpdateItem } from '../../../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { BackpackItem } from '../../../backend';

interface EditItemDialogProps {
  item: BackpackItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditItemDialog({ item, open, onOpenChange }: EditItemDialogProps) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [description, setDescription] = useState(item.description);
  const [weight, setWeight] = useState(item.weight.toString());

  const { mutate: updateItem, isPending } = useUpdateItem();

  useEffect(() => {
    if (open) {
      setName(item.name);
      setQuantity(item.quantity.toString());
      setDescription(item.description);
      setWeight(item.weight.toString());
    }
  }, [open, item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter an item name');
      return;
    }

    const quantityNum = parseInt(quantity);
    const weightNum = parseFloat(weight);

    if (isNaN(quantityNum) || quantityNum < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    if (isNaN(weightNum) || weightNum < 0) {
      toast.error('Weight must be a positive number');
      return;
    }

    updateItem(
      {
        id: item.id,
        name: name.trim(),
        quantity: BigInt(quantityNum),
        description: description.trim(),
        weight: weightNum,
      },
      {
        onSuccess: () => {
          toast.success('Item updated successfully');
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(`Failed to update item: ${error.message}`);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>Make changes to your backpack item</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Item Name *</Label>
            <Input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-quantity">Quantity *</Label>
              <Input
                id="edit-quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={isPending}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-weight">Weight (kg) *</Label>
              <Input
                id="edit-weight"
                type="number"
                step="0.1"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                disabled={isPending}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
