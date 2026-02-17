// Import/Export page: Placeholder
import { Typography, Paper } from '@mui/material';
import { useRef, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, Box, FormControlLabel, Checkbox } from '@mui/material';

// Simulated image search database (in-memory for now)
const imageSearchDBKey = 'collectease-image-search-db';


function getImagesFromSearchDB(): string[] {
  return JSON.parse(localStorage.getItem(imageSearchDBKey) || '[]');
}

export default function ImportExport() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [searchable, setSearchable] = useState(false);
  /**
   * ⚡ BOLT OPTIMIZATION: Use lazy initialization for state derived from localStorage.
   * This ensures the expensive JSON.parse(localStorage.getItem(...)) only runs on initial mount,
   * not on every subsequent re-render.
   */
  const [dbImages, setDbImages] = useState<string[]>(() => getImagesFromSearchDB());

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);

    // Helper to read file as DataURL
    const readFile = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const imageFiles = fileList.filter(f => f.type.startsWith('image/'));
    const otherFiles = fileList.filter(f => !f.type.startsWith('image/'));

    // Handle non-image files
    otherFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        alert('File imported! (See console for contents)');
        console.log('Imported file contents:', e.target?.result);
      };
      reader.readAsText(file);
    });

    try {
      /**
       * ⚡ BOLT OPTIMIZATION: Process files in parallel using Promise.all.
       * This significantly improves performance over sequential processing when importing multiple files.
       */
      const newImageUrls = await Promise.all(imageFiles.map(readFile));

      if (newImageUrls.length > 0) {
        setImages((prev) => [...prev, ...newImageUrls]);
        if (searchable) {
          /**
           * ⚡ BOLT OPTIMIZATION: Update state and persistence in a single pass.
           * By using the current state instead of re-reading from localStorage,
           * we eliminate redundant synchronous I/O operations that block the main thread.
           */
          const updatedDb = [...dbImages, ...newImageUrls];
          setDbImages(updatedDb);
          localStorage.setItem(imageSearchDBKey, JSON.stringify(updatedDb));
          alert('Images imported and added to the search database!');
        }
      }
    } catch (error) {
      console.error('Error reading image files:', error);
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
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export', error);
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
        startIcon={<UploadFileIcon />}
        onClick={() => fileInputRef.current?.click()}
        sx={{ mt: 2 }}
      >
        Import Files or Images
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
                  loading="lazy"
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
                  loading="lazy"
                />
              </Box>
            ))}
          </Box>
        </>
      )}
      <Button variant="outlined" sx={{ mt: 4 }} onClick={handleExport}>
        Export Search Database
      </Button>
    </Paper>
  );
}
