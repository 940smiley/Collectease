import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  addCollectionItem,
  getCollectionItems,
  getCollectionSummary,
  removeCollectionItem,
  type CollectionCategory,
} from '../store/collectionStore';

const categories: CollectionCategory[] = ['Cards', 'Coins', 'Comics', 'Figures', 'Games', 'Other'];

export default function Collection() {
  const [items, setItems] = useState(getCollectionItems);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CollectionCategory>('Cards');
  const [quantity, setQuantity] = useState(1);
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [notes, setNotes] = useState('');

  const summary = useMemo(() => getCollectionSummary(items), [items]);

  const refreshItems = () => setItems(getCollectionItems());

  const handleAddItem = () => {
    if (!name.trim()) return;

    addCollectionItem({
      name: name.trim(),
      category,
      quantity: Math.max(1, quantity),
      estimatedValue: Math.max(0, estimatedValue),
      notes: notes.trim() || undefined,
    });

    setName('');
    setCategory('Cards');
    setQuantity(1);
    setEstimatedValue(0);
    setNotes('');
    refreshItems();
  };

  const handleRemove = (id: string) => {
    removeCollectionItem(id);
    refreshItems();
  };

  return (
    <Stack spacing={3}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Your Collection
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Add items to create a lightweight inventory with estimated value tracking.
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
          <Chip label={`Types: ${summary.itemTypes}`} color="primary" variant="outlined" />
          <Chip label={`Units: ${summary.totalUnits}`} color="secondary" variant="outlined" />
          <Chip label={`Estimated value: $${summary.totalEstimatedValue.toFixed(2)}`} variant="outlined" />
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' },
          }}
        >
          <TextField label="Item name" value={name} onChange={(event) => setName(event.target.value)} required />
          <TextField
            label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value as CollectionCategory)}
            select
          >
            {categories.map((itemCategory) => (
              <MenuItem key={itemCategory} value={itemCategory}>
                {itemCategory}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value) || 0)}
            inputProps={{ min: 1 }}
          />
          <TextField
            label="Estimated value ($)"
            type="number"
            value={estimatedValue}
            onChange={(event) => setEstimatedValue(Number(event.target.value) || 0)}
            inputProps={{ min: 0, step: '0.01' }}
          />
          <TextField
            label="Notes (optional)"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            sx={{ gridColumn: { xs: '1', md: '1 / span 3' } }}
          />
          <Button variant="contained" onClick={handleAddItem} sx={{ minHeight: 56 }}>
            Add item
          </Button>
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Inventory
        </Typography>

        {items.length === 0 ? (
          <Alert severity="info">No items yet. Add your first collectible above.</Alert>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Est. Value</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">${(item.quantity * item.estimatedValue).toFixed(2)}</TableCell>
                  <TableCell>{item.notes || '—'}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label={`Delete ${item.name}`} onClick={() => handleRemove(item.id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Stack>
  );
}
