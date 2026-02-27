// Import/Export page: Placeholder
import {
  Typography, Paper, Snackbar, Alert, CircularProgress,
  Button, Box, FormControlLabel, Checkbox
} from '@mui/material';
import { useRef, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';

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
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setLoading(true);
      const fileArray = Array.from(files);
      const promises = fileArray.map((file) => {
        return new Promise<string | null>((resolve) => {
          const reader = new FileReader();
          if (file.type.startsWith('image/')) {
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
          } else {
            reader.onload = () => resolve(null); // Non-image files don't contribute to 'images' state
            reader.onerror = () => resolve(null);
            reader.readAsText(file);
          }
        });
      });

      Promise.all(promises).then((results) => {
        const newImages = results.filter((result): result is string => result !== null);

        if (newImages.length > 0) {
          setImages((prev) => [...prev, ...newImages]);
          if (searchable) {
            saveImagesToSearchDB(newImages);
            setDbImages(getImagesFromSearchDB());
            setSnackbar({
              open: true,
              message: `${newImages.length} image(s) imported and added to search database!`,
              severity: 'success',
            });
          } else {
            setSnackbar({
              open: true,
              message: `${newImages.length} image(s) imported!`,
              severity: 'success',
            });
          }
        } else {
          setSnackbar({
            open: true,
            message: 'No images were found in the selected files.',
            severity: 'info',
          });
        }

        setLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }).catch((error) => {
        console.error('Error processing files:', error);
        setLoading(false);
        setSnackbar({
          open: true,
          message: 'Error processing files. Please try again.',
          severity: 'error',
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
      });
    }
  };

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(dbImages, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = `search-db-images-${new Date().toISOString().split('T')[0]}.json`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSnackbar({
        open: true,
        message: 'Search database exported successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Failed to export', error);
      setSnackbar({
        open: true,
        message: 'Failed to export database.',
        severity: 'error',
      });
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
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <UploadFileIcon />}
        onClick={() => fileInputRef.current?.click()}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Import Files or Images'}
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
      <Button
        variant="outlined"
        sx={{ mt: 4 }}
        onClick={handleExport}
        disabled={dbImages.length === 0}
      >
        Export Search Database
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
