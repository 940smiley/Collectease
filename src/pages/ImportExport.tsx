import { Typography, Paper, Button, Box, FormControlLabel, Checkbox, Snackbar, Alert, Tooltip } from '@mui/material';
import { useRef, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Simulated image search database
const imageSearchDBKey = 'collectease-image-search-db';

/**
 * Persists images to localStorage and returns the updated list.
 * Using an append strategy to maintain history.
 */
function saveImagesToSearchDB(newImages: string[]): string[] {
  const existing = JSON.parse(localStorage.getItem(imageSearchDBKey) || '[]');
  const updated = [...existing, ...newImages];
  localStorage.setItem(imageSearchDBKey, JSON.stringify(updated));
  return updated;
}

function getImagesFromSearchDB(): string[] {
  return JSON.parse(localStorage.getItem(imageSearchDBKey) || '[]');
}

export default function ImportExport() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [searchable, setSearchable] = useState(false);
  // Lazy initializer to prevent redundant LocalStorage reads on every component re-render
  const [dbImages, setDbImages] = useState<string[]>(() => getImagesFromSearchDB());
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const showMessage = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const imageFiles = fileList.filter(file => file.type.startsWith('image/'));
    const otherFiles = fileList.filter(file => !file.type.startsWith('image/'));

    // Process images in parallel using Promise.all for better performance
    if (imageFiles.length > 0) {
      try {
        const newImageUrls = await Promise.all(
          imageFiles.map(file => {
            return new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          })
        );

        // Update local session state
        setImages((prev) => [...prev, ...newImageUrls]);

        if (searchable) {
          // Optimization: Only persist the NEW images to the database.
          // The persistence function handles merging with existing data.
          // This avoids the O(n^2) duplication bug present in the original implementation
          // where the entire session list was re-persisted on every upload.
          const updatedDb = saveImagesToSearchDB(newImageUrls);
          setDbImages(updatedDb);
          showMessage('Images imported and added to the search database!');
        } else {
          showMessage(`${newImageUrls.length} images imported successfully!`);
        }
      } catch (error) {
        console.error('Failed to read images', error);
        showMessage('Failed to import some images.', 'error');
      }
    }

    // Process other files
    otherFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        showMessage('File imported successfully!');
        console.log('Imported file contents:', text);
      };
      reader.readAsText(file);
    });

    // Reset input to allow re-importing same files if needed
    event.target.value = '';
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
                  loading="lazy"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
      <Button variant="outlined" sx={{ mt: 4 }} onClick={handleExport}>
        Export Search Database
      </Button>

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
