import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Chip, Paper, Stack, Typography } from '@mui/material';
import { COLLECTION_UPDATED_EVENT, getCollectionItems, getCollectionSummary } from '../store/collectionStore';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

export default function Dashboard() {
  const [items, setItems] = useState(getCollectionItems);

  useEffect(() => {
    const handleUpdate = () => setItems(getCollectionItems());
    window.addEventListener(COLLECTION_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(COLLECTION_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const summary = useMemo(() => getCollectionSummary(items), [items]);
  const launchReadiness = [
    { label: 'Inventory exists', done: summary.itemTypes > 0 },
    { label: 'Estimated value calculated', done: summary.totalEstimatedValue > 0 },
    { label: 'Import/export available', done: true },
    { label: 'Marketplace prep available', done: true },
  ];

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Collectease
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Organize, value, and share your collectibles.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} mt={3} mb={2}>
        <Chip label={`Item types: ${summary.itemTypes}`} color="primary" />
        <Chip label={`Total units: ${summary.totalUnits}`} color="secondary" />
        <Chip label={`Portfolio value: ${formatCurrency(summary.totalEstimatedValue)}`} />
      </Stack>

      <Box mt={3}>
        <Typography variant="h6" gutterBottom>
          Launch readiness
        </Typography>
        <Stack spacing={1}>
          {launchReadiness.map((step) => (
            <Alert key={step.label} severity={step.done ? 'success' : 'warning'}>
              {step.label}
            </Alert>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
