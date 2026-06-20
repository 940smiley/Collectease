export type Collectible = {
  id: string;
  title: string;
  category: string;
  condition: string;
  source: string;
  value: number;
  confidence: number;
  status: 'Cataloged' | 'Needs photos' | 'Ready to list' | 'Shared';
  comps: number;
  tags: string[];
};

export type MarketListing = {
  channel: string;
  fee: string;
  fit: string;
  action: string;
};

export const demoItems: Collectible[] = [
  {
    id: 'CL-1024',
    title: '1999 Pokemon Base Set Charizard',
    category: 'Trading cards',
    condition: 'Near mint',
    source: 'eBay sold comps',
    value: 412,
    confidence: 92,
    status: 'Ready to list',
    comps: 18,
    tags: ['graded candidate', 'high demand', 'insured'],
  },
  {
    id: 'CL-1188',
    title: 'NES The Legend of Zelda cartridge',
    category: 'Video games',
    condition: 'Tested, loose',
    source: 'PriceCharting import',
    value: 63,
    confidence: 81,
    status: 'Cataloged',
    comps: 26,
    tags: ['retro', 'tested', 'manual missing'],
  },
  {
    id: 'CL-1260',
    title: 'Hot Wheels Redline Custom Camaro',
    category: 'Die-cast cars',
    condition: 'Light play wear',
    source: 'expanded sold search',
    value: 145,
    confidence: 74,
    status: 'Needs photos',
    comps: 9,
    tags: ['redline', 'photo needed', 'case B'],
  },
  {
    id: 'CL-1314',
    title: 'Amazing Spider-Man #361',
    category: 'Comics',
    condition: 'VF/NM raw',
    source: 'manual entry',
    value: 118,
    confidence: 69,
    status: 'Shared',
    comps: 12,
    tags: ['first appearance', 'shared shelf', 'protective sleeve'],
  },
];

export const collectionStats = [
  { label: 'Tracked value', value: '$18.4K', detail: '+12.5% from sold comps' },
  { label: 'Items cataloged', value: '342', detail: '31 awaiting photos' },
  { label: 'Share views', value: '1,208', detail: 'last 30 days' },
  { label: 'Ready to list', value: '47', detail: 'across 4 marketplaces' },
];

export const marketplaceListings: MarketListing[] = [
  { channel: 'eBay', fee: '13.25%', fit: 'Best for sold-comps-backed pricing', action: 'Draft listing ready' },
  { channel: 'Facebook Marketplace', fee: '0%', fit: 'Best for local pickup and bundles', action: 'Create local listing' },
  { channel: 'eBid', fee: '5%', fit: 'Best for lower-fee long-tail collectibles', action: 'Export CSV' },
  { channel: 'Collector share link', fee: '0%', fit: 'Best for private buyer previews', action: 'Publish shelf' },
];

export const importSources = [
  'PriceCharting CSV',
  'eBay active and sold exports',
  'Phone camera image batches',
  'Manual JSON backups',
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}
