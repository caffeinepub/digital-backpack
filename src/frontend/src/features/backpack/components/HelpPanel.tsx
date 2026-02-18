import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export default function HelpPanel() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>How to Use Digital Backpack</DialogTitle>
          <DialogDescription>
            Learn how to organize and manage your items effectively
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">What is Digital Backpack?</h3>
            <p className="text-sm text-muted-foreground">
              Digital Backpack is your personal inventory management tool. Think of it like organizing
              a real backpack for a trip—you can add items, track quantities, note their weight, and
              keep everything organized in one place.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="adding">
              <AccordionTrigger>Adding Items</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>To add a new item to your backpack:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Enter the item name (required)</li>
                  <li>Set the quantity (how many of this item)</li>
                  <li>Enter the weight in kilograms</li>
                  <li>Optionally add a description with notes</li>
                  <li>Click "Add Item" to save</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="editing">
              <AccordionTrigger>Editing Items</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>To update an existing item:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Find the item in your list</li>
                  <li>Click the edit icon (pencil) on the right</li>
                  <li>Make your changes in the dialog</li>
                  <li>Click "Save Changes" to update</li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="deleting">
              <AccordionTrigger>Deleting Items</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>To remove an item from your backpack:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Find the item you want to remove</li>
                  <li>Click the delete icon (trash) on the right</li>
                  <li>Confirm the deletion in the dialog</li>
                </ol>
                <p className="text-amber-600 dark:text-amber-500 mt-2">
                  ⚠️ Deletion is permanent and cannot be undone
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="searching">
              <AccordionTrigger>Searching & Sorting</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>Use the controls above your item list to:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>Search:</strong> Type in the search box to filter items by name
                  </li>
                  <li>
                    <strong>Sort:</strong> Use the dropdown to sort by name (A-Z) or quantity
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="summary">
              <AccordionTrigger>Understanding the Summary</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>The summary cards at the top show:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>Total Items:</strong> Number of different item types
                  </li>
                  <li>
                    <strong>Total Quantity:</strong> Sum of all individual pieces
                  </li>
                  <li>
                    <strong>Total Weight:</strong> Combined weight of all items in kilograms
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
