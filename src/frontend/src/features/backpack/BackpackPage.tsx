import { useState, useMemo } from 'react';
import { useListItems } from '../../hooks/useQueries';
import { useGetCallerUserProfile } from '../../hooks/useCurrentUserProfile';
import AppShell from '../../components/layout/AppShell';
import SummaryCards from './components/SummaryCards';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import ListControls from './components/ListControls';
import HelpPanel from './components/HelpPanel';
import BackpackLoadingState from './components/BackpackLoadingState';
import BackpackErrorState from './components/BackpackErrorState';
import { applySearchFilterSort } from './state/listControls';

export default function BackpackPage() {
  const { data: items = [], isLoading, isError, error, refetch } = useListItems();
  const { data: userProfile } = useGetCallerUserProfile();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'quantity'>('name');

  const filteredItems = useMemo(() => {
    return applySearchFilterSort(items, searchQuery, sortBy);
  }, [items, searchQuery, sortBy]);

  if (isLoading) {
    return (
      <AppShell userName={userProfile?.name}>
        <BackpackLoadingState />
      </AppShell>
    );
  }

  if (isError) {
    return (
      <AppShell userName={userProfile?.name}>
        <BackpackErrorState error={error} onRetry={refetch} />
      </AppShell>
    );
  }

  return (
    <AppShell userName={userProfile?.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Backpack</h1>
            <p className="text-muted-foreground mt-1">
              Organize your items and track what you need
            </p>
          </div>
          <HelpPanel />
        </div>

        <SummaryCards items={items} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ItemForm />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <ListControls
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <ItemList items={filteredItems} allItems={items} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
