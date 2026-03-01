// Import/Export page: Placeholder
import {
  Typography,
  Paper,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { useRef, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';

// Simulated image search database (in-memory for now)
const imageSearchDBKey = 'collectease-image-search-db';

function saveImagesToSearchDB(images: string[]) {
  // Save images to localStorage for persistence
  const existing = JSON.parse(localStorage.getItem(imageSearchDBKey) || '[]');
  const updated = [...existing, ...images];
  localStorage.setItem(imageSearchDBKey, JSON.stringify(updated));
}

function getImagesFromSearchDB(): string[] {
  return JSON.parse(localStorage.getItem(imageSearchDBKey) || '[]');
}

export default function ImportExport() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [searchable, setSearchable] = useState(false);
  const [dbImages, setDbImages] = useState<string[]>(getImagesFromSearchDB());
  const [isImporting, setIsImporting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, msg: '', sev: 'success' as 'success' | 'error' });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    setIsImporting(true);
    const results = await Promise.all([...files].map((file) => new Promise<string | null>((res) => {
      const r = new FileReader();
      r.onload = (e) => res(file.type.startsWith('image/') ? (e.target?.result as string) : null);
      r.onerror = () => res(null);
      if (file.type.startsWith('image/')) {
        r.readAsDataURL(file);
      } else {
        r.readAsText(file);
      }
    })));
    const newImgs = results.filter((r): r is string => !!r);
    if (newImgs.length) {
      setImages((p) => [...p, ...newImgs]);
      if (searchable) {
        saveImagesToSearchDB(newImgs);
        setDbImages(getImagesFromSearchDB());
      }
    }
    setSnackbar({ open: true, msg: 'Import complete!', sev: 'success' });
    setIsImporting(false);
    event.target.value = '';
  };

  const handleExport = () => {
    try {
      const blob = new Blob([JSON.stringify(dbImages, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `search-db-images-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setSnackbar({ open: true, msg: 'Database exported!', sev: 'success' });
    } catch {
      setSnackbar({ open: true, msg: 'Export failed!', sev: 'error' });
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Import & Export
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Import your collection or export it to other platforms.
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={searchable}
            onChange={(_, checked) => setSearchable(checked)}
            color="primary"
          />
        }
        label="Mark imported images as searchable (for image recognition/search)"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        startIcon={isImporting ? <CircularProgress size={20} color="inherit" /> : <UploadFileIcon />}
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        sx={{ mt: 2 }}
      >
        {isImporting ? 'Importing...' : 'Import Files or Images'}
      </Button>
      <input
        type="file"
        accept=".csv,.json,.txt,image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
      {images.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            Imported Images:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              mt: 1,
            }}
          >
            {images.map((img, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fafafa',
                }}
              >
                <img
                  src={img}
                  alt={`imported-${idx}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
      {dbImages.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 4 }}>
            Images in Search Database:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              mt: 1,
            }}
          >
            {dbImages.map((img, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid #90caf9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#e3f2fd',
                }}
              >
                <img
                  src={img}
                  alt={`dbimg-${idx}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
      <Tooltip title={dbImages.length ? 'Download search database' : 'No data to export'}>
        <span>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ mt: 4 }}
            onClick={handleExport}
            disabled={!dbImages.length}
          >
            Export Search Database
          </Button>
        </span>
      </Tooltip>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.sev} sx={{ width: '100%' }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
