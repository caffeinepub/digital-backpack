import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import EditItemDialog from './EditItemDialog';
import DeleteItemDialog from './DeleteItemDialog';
import type { BackpackItem } from '../../../backend';

interface ItemRowProps {
  item: BackpackItem;
}

export default function ItemRow({ item }: ItemRowProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold truncate">{item.name}</h4>
            <Badge variant="secondary" className="shrink-0">
              ×{item.quantity.toString()}
            </Badge>
          </div>
          {item.description && (
            <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">{item.weight} kg</p>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowEditDialog(true)}
            title="Edit item"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
            title="Delete item"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>

      <EditItemDialog
        item={item}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />

      <DeleteItemDialog
        item={item}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  );
}
