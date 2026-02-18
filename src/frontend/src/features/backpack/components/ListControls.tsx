import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface ListControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'name' | 'quantity';
  onSortChange: (sort: 'name' | 'quantity') => void;
}

export default function ListControls({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: ListControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 space-y-2">
        <Label htmlFor="search" className="sr-only">Search items</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2 sm:w-48">
        <Label htmlFor="sort" className="sr-only">Sort by</Label>
        <Select value={sortBy} onValueChange={(value) => onSortChange(value as 'name' | 'quantity')}>
          <SelectTrigger id="sort">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="quantity">Quantity</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
