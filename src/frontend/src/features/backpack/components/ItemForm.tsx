import { useState } from 'react';
import { useCreateItem } from '../../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function ItemForm() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('0.5');

  const { mutate: createItem, isPending } = useCreateItem();

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

    createItem(
      {
        name: name.trim(),
        quantity: BigInt(quantityNum),
        description: description.trim(),
        weight: weightNum,
      },
      {
        onSuccess: () => {
          setName('');
          setQuantity('1');
          setDescription('');
          setWeight('0.5');
          toast.success('Item added to backpack');
        },
        onError: (error) => {
          toast.error(`Failed to add item: ${error.message}`);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Item</CardTitle>
        <CardDescription>Add items to your digital backpack</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Water Bottle"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={isPending}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg) *</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0"
                placeholder="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                disabled={isPending}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Optional notes about this item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
