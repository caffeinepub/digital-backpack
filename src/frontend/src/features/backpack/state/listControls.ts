import type { BackpackItem } from '../../../backend';

export function applySearchFilterSort(
  items: BackpackItem[],
  searchQuery: string,
  sortBy: 'name' | 'quantity'
): BackpackItem[] {
  let filtered = [...items];

  // Apply search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }

  // Apply sort
  filtered.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'quantity') {
      return Number(b.quantity) - Number(a.quantity);
    }
    return 0;
  });

  return filtered;
}
