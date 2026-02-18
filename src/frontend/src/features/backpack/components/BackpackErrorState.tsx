import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface BackpackErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

export default function BackpackErrorState({ error, onRetry }: BackpackErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md">
        <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-sm text-muted-foreground mb-6">
            {error?.message || 'Failed to load your backpack. Please try again.'}
          </p>
          <Button onClick={onRetry}>Try Again</Button>
        </CardContent>
      </Card>
    </div>
  );
}
