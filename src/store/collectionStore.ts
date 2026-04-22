export type CollectionCategory =
  | 'Cards'
  | 'Coins'
  | 'Comics'
  | 'Figures'
  | 'Games'
  | 'Other';

export interface CollectionItem {
  id: string;
  name: string;
  category: CollectionCategory;
  quantity: number;
  estimatedValue: number;
  notes?: string;
  createdAt: string;
}

const COLLECTION_KEY = 'collectease-collection-items';
export const COLLECTION_UPDATED_EVENT = 'collectease:collection-updated';

function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

export function getCollectionItems(): CollectionItem[] {
  if (!hasWindow()) return [];

  const raw = window.localStorage.getItem(COLLECTION_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as CollectionItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveCollectionItems(items: CollectionItem[]): void {
  if (!hasWindow()) return;
  window.localStorage.setItem(COLLECTION_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(COLLECTION_UPDATED_EVENT));
}

export function addCollectionItem(item: Omit<CollectionItem, 'id' | 'createdAt'>): CollectionItem {
  const next: CollectionItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const items = getCollectionItems();
  saveCollectionItems([next, ...items]);
  return next;
}

export function removeCollectionItem(id: string): void {
  const filtered = getCollectionItems().filter((item) => item.id !== id);
  saveCollectionItems(filtered);
}

export function replaceCollectionItems(items: CollectionItem[]): void {
  saveCollectionItems(items);
}

export function getCollectionSummary(items = getCollectionItems()): {
  itemTypes: number;
  totalUnits: number;
  totalEstimatedValue: number;
} {
  return items.reduce(
    (acc, item) => {
      acc.itemTypes += 1;
      acc.totalUnits += item.quantity;
      acc.totalEstimatedValue += item.estimatedValue * item.quantity;
      return acc;
    },
    { itemTypes: 0, totalUnits: 0, totalEstimatedValue: 0 },
  );
}
