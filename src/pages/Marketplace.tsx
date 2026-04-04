// Marketplace page: Placeholder
import { Typography, Paper } from '@mui/material';

export default function Marketplace() {
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Marketplace Integration
      </Typography>
      <Typography color="text.secondary">
        List your items on eBay, Facebook Marketplace, and more. (Coming soon)
      </Typography>
    </Paper>
  );
}

