// Dashboard page: Welcome and summary
import { Typography, Paper, Box } from '@mui/material';

export default function Dashboard() {
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Collectease
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Organize, value, and share your collectibles. Use the navigation to get started!
      </Typography>
      <Box mt={3}>
        {/* Future: Add summary widgets here */}
      </Box>
    </Paper>
  );
}
