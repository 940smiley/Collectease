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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const showMessage = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      let loaded = 0;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            newImages.push(imageUrl);
            loaded++;
            if (loaded === files.length) {
              setImages((prev) => [...prev, ...newImages]);
              if (searchable) {
if (loaded === files.length) {
  setImages((prev) => {
    const updatedImages = [...prev, ...newImages];
    if (searchable) {
      // Add the updated list to the search database
      saveImagesToSearchDB(updatedImages);
      setDbImages(getImagesFromSearchDB());
      showMessage('Images imported and added to the search database!');
    } else {
      showMessage(`${newImages.length} images imported successfully!`);
    }
    return updatedImages;
  });
}
                saveImagesToSearchDB([...images, ...newImages]);
                setDbImages(getImagesFromSearchDB());
                showMessage('Images imported and added to the search database!');
              } else {
                showMessage(`${newImages.length} images imported successfully!`);
              }
            }
          };
          reader.readAsDataURL(file);
        } else {
          // For non-image files, just read as text
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result;
            showMessage('File imported successfully!');
            console.log('Imported file contents:', text);
          };
          reader.readAsText(file);
        }
      }
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
      showMessage('Database exported successfully!');
    } catch (error) {
      console.error('Failed to export', error);
      showMessage('Failed to export data. Please try again.', 'error');
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
      <Tooltip title="Upload CSV, JSON, TXT, or Image files to your collection" arrow>
        <Button
          variant="contained"
          startIcon={<UploadFileIcon />}
          onClick={() => fileInputRef.current?.click()}
          sx={{ mt: 2 }}
        >
          Import Files or Images
        </Button>
      </Tooltip>
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
                  alt={`Imported item ${idx + 1}`}
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
                  alt={`Database item ${idx + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
      <Tooltip
        title={
          dbImages.length === 0 ? 'No data available to export' : 'Download search database as JSON'
        }
        arrow
        describeChild
      >
        <Box component="span" sx={{ display: 'inline-block', mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={dbImages.length === 0}
            sx={{ mt: 0 }}
          >
            Export Search Database
          </Button>
        </Box>
      </Tooltip>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
