import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Weight } from 'lucide-react';
import type { BackpackItem } from '../../../backend';

interface SummaryCardsProps {
  items: BackpackItem[];
}

export default function SummaryCards({ items }: SummaryCardsProps) {
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity), 0);
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {totalItems === 1 ? 'item' : 'items'} in your backpack
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalQuantity}</div>
          <p className="text-xs text-muted-foreground mt-1">
            individual pieces
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Weight</CardTitle>
          <Weight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalWeight.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            kilograms
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
