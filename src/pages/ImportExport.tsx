// Import/Export page: Placeholder
import { Typography, Paper, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useRef, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, Box, FormControlLabel, Checkbox } from '@mui/material';

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
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsImporting(true);
      const fileList = Array.from(files);
      let loaded = 0;
      let successCount = 0;
      const newImages: string[] = [];

      fileList.forEach((file) => {
        const reader = new FileReader();

        const onComplete = () => {
          loaded++;
          if (loaded === fileList.length) {
            setIsImporting(false);
            if (successCount > 0) {
              if (searchable) {
                const imageBatch = newImages;
                saveImagesToSearchDB(imageBatch);
                setDbImages(getImagesFromSearchDB());
                setSnackbar({ open: true, message: `Successfully imported ${successCount} files and updated search database!`, severity: 'success' });
              } else {
                setSnackbar({ open: true, message: `Successfully imported ${successCount} files!`, severity: 'success' });
              }
              setImages((prev) => [...prev, ...newImages]);
            }
          }
        };

        if (file.type.startsWith('image/')) {
          reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            newImages.push(imageUrl);
            successCount++;
            onComplete();
          };
          reader.onerror = () => {
            setSnackbar({ open: true, message: `Failed to read file: ${file.name}`, severity: 'error' });
            onComplete();
          };
          reader.readAsDataURL(file);
        } else {
          reader.onload = () => {
            successCount++;
            onComplete();
          };
          reader.onerror = () => {
            setSnackbar({ open: true, message: `Failed to read file: ${file.name}`, severity: 'error' });
            onComplete();
          };
          reader.readAsText(file);
        }
      });
    }
  };

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(dbImages, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const filename = `search-db-images-${new Date().toISOString().split('T')[0]}.json`;
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSnackbar({ open: true, message: 'Search database exported successfully!', severity: 'success' });
    } catch (error) {
      console.error('Failed to export:', error);
      setSnackbar({ open: true, message: 'Failed to export data. Please try again.', severity: 'error' });
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
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
        <Button
          variant="contained"
          startIcon={isImporting ? <CircularProgress size={20} color="inherit" /> : <UploadFileIcon />}
          onClick={() => fileInputRef.current?.click()}
          disabled={isImporting}
        >
          {isImporting ? 'Importing...' : 'Import Files or Images'}
        </Button>
        {dbImages.length > 0 && (
          <Button variant="outlined" onClick={handleExport}>
            Export Search Database
          </Button>
        )}
      </Box>
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
            Recently Imported Images:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
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
                  alt={`Imported collectible ${idx + 1}`}
                  loading="lazy"
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
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
                  alt={`Database image ${idx + 1}`}
                  loading="lazy"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Box>
            ))}
          </Box>
        </>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
