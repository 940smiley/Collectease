// Import/Export page: Placeholder
import { Typography, Paper } from '@mui/material';
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
  // Lazy initialization avoids reading from localStorage on every re-render
  const [dbImages, setDbImages] = useState<string[]>(() => getImagesFromSearchDB());

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
                // Optimize: Save only the NEW images to the database.
                // saveImagesToSearchDB already appends to existing localStorage data.
                saveImagesToSearchDB(newImages);
                // Optimize: Update state functionally to avoid a redundant localStorage read
                setDbImages((prev) => [...prev, ...newImages]);
                alert('Images imported and added to the search database!');
                console.log('Images in search DB:', getImagesFromSearchDB());
              }
            }
          };
          reader.readAsDataURL(file);
        } else {
          // For non-image files, just read as text (optional: handle as before)
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result;
            alert('File imported! (See console for contents)');
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
  } catch (error) {
    console.error('Failed to export', error);
    // Assuming you have some form of error notification system
    // showError('Failed to export data. Please try again.');
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
                  alt={`dbimg-${idx}`}
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
    </Paper>
  );
}
