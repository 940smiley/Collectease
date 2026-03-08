// Collection page: Placeholder for category/item management
import { Typography, Paper } from "@mui/material";

export default function Collection() {
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Collection
      </Typography>
      <Typography color="text.secondary">
        Manage your categories and items here. (Coming soon)
      </Typography>
    </Paper>
  );
}
