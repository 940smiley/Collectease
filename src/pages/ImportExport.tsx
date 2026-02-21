// Import/Export page: Optimized for performance and correctness
import { Typography, Paper } from '@mui/material';
import { useRef, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, Box, FormControlLabel, Checkbox } from '@mui/material';

// Simulated image search database (in-memory for now)
const imageSearchDBKey = 'collectease-image-search-db';

/**
 * Optimized LocalStorage access
 */
function getImagesFromSearchDB(): string[] {
  try {
    return JSON.parse(localStorage.getItem(imageSearchDBKey) || '[]');
  } catch (error) {
    console.error('Failed to parse images from search DB', error);
    return [];
  }
}

export default function ImportExport() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [searchable, setSearchable] = useState(false);
  // Bolt Optimization: Lazy initialization avoids synchronous I/O on every render
  const [dbImages, setDbImages] = useState<string[]>(() => getImagesFromSearchDB());

  /**
   * Bolt Optimization: Parallelize file reading and batch state/localStorage updates
   */
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Read all files in parallel
    const filePromises = Array.from(files).map((file) => {
      return new Promise<string | null>((resolve) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(file);
        } else {
          // Skip non-image files or handle as needed
          resolve(null);
        }
      });
    });

    const results = await Promise.all(filePromises);
    const newImages = results.filter((img): img is string => img !== null);

    if (newImages.length > 0) {
      // Batch state updates
      setImages((prev) => [...prev, ...newImages]);

      if (searchable) {
        // Bolt Optimization: Update state and localStorage efficiently
        setDbImages((prevDb) => {
          const updated = [...prevDb, ...newImages];
          // We write to localStorage here to ensure persistence,
          // although we keep the state update pure for React.
          // Note: In a larger app, this side effect should be in a useEffect.
          setTimeout(() => {
            localStorage.setItem(imageSearchDBKey, JSON.stringify(updated));
          }, 0);
          return updated;
        });
        alert(`${newImages.length} images imported and added to the search database!`);
      }
    }

    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /**
   * Fix: Corrected handleExport with proper Blob creation and download trigger
   */
  const handleExport = () => {
    if (dbImages.length === 0) {
      alert('Search database is empty.');
      return;
    }
    try {
      const dataStr = JSON.stringify(dbImages, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = `search-db-images-${new Date().toISOString().split('T')[0]}.json`;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export search database', error);
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
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<UploadFileIcon />}
          onClick={() => fileInputRef.current?.click()}
        >
          Import Images
        </Button>
        <Button
          variant="outlined"
          onClick={handleExport}
          disabled={dbImages.length === 0}
        >
          Export Search Database
        </Button>
      </Box>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />

      {images.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            Recently Imported:
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
                key={`imported-${idx}`}
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
            Images in Search Database ({dbImages.length}):
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
                key={`dbimg-${idx}`}
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
                  loading="lazy"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Paper>
  );
}
