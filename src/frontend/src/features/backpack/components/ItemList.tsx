import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import ItemRow from './ItemRow';
import type { BackpackItem } from '../../../backend';

interface ItemListProps {
  items: BackpackItem[];
  allItems: BackpackItem[];
}

export default function ItemList({ items, allItems }: ItemListProps) {
  const isEmpty = allItems.length === 0;
  const isFiltered = items.length !== allItems.length;

  if (isEmpty) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your backpack is empty</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            Start adding items using the form on the left to organize your digital backpack
          </p>
        </CardContent>
      </Card>
    );
  }

  if (items.length === 0 && isFiltered) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No items found</h3>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            Try adjusting your search to find what you're looking for
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Items ({items.length})</CardTitle>
        <CardDescription>
          {isFiltered ? `Showing ${items.length} of ${allItems.length} items` : 'All your backpack items'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <ItemRow key={item.id.toString()} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}
