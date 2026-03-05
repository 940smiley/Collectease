// Import/Export page: Placeholder
import { Typography, Paper } from '@mui/material';
import { useRef, useState, useMemo, useCallback } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, Box, FormControlLabel, Checkbox } from '@mui/material';

// Simulated image search database (in-memory for now)
const imageSearchDBKey = 'collectease-image-search-db';

/**
 * Saves unique images to localStorage to avoid redundant storage and memory bloat.
 * ⚡ Performance: Uses a Set to ensure O(1) duplicate checking.
 */
function saveImagesToSearchDB(newImages: string[]) {
  try {
    const existingStr = localStorage.getItem(imageSearchDBKey);
    const existing: string[] = existingStr ? JSON.parse(existingStr) : [];
    const existingSet = new Set(existing);

    let changed = false;
    newImages.forEach(img => {
      if (!existingSet.has(img)) {
        existingSet.add(img);
        changed = true;
      }
    });

    if (changed) {
      localStorage.setItem(imageSearchDBKey, JSON.stringify(Array.from(existingSet)));
    }
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

function getImagesFromSearchDB(): string[] {
  try {
    return JSON.parse(localStorage.getItem(imageSearchDBKey) || '[]');
  } catch (e) {
    console.error('Failed to parse images from localStorage', e);
    return [];
  }
}

export default function ImportExport() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [searchable, setSearchable] = useState(false);
  const [dbImages, setDbImages] = useState<string[]>(getImagesFromSearchDB());

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      let loaded = 0;
      const fileCount = files.length;

      for (let i = 0; i < fileCount; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            newImages.push(imageUrl);
            loaded++;

            if (loaded === fileCount) {
              setImages((prev) => [...prev, ...newImages]);
              if (searchable) {
                saveImagesToSearchDB(newImages);
                setDbImages(getImagesFromSearchDB());
                alert('Images imported and added to the search database!');
              }
            }
          };
          reader.readAsDataURL(file);
        } else {
          // Non-image files: handle as before
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result;
            console.log('Imported file contents:', text);
            loaded++;
            if (loaded === fileCount) {
              alert('Non-image file(s) imported! (See console)');
            }
          };
          reader.readAsText(file);
        }
      }
    }
  }, [searchable]);

  const handleExport = useCallback(() => {
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
  }, [dbImages]);

  // ⚡ Performance: Memoize image lists to prevent re-rendering when 'searchable' or other state changes
  const renderedImportedImages = useMemo(() => (
    images.map((img) => (
      <Box
        key={img.substring(0, 50)}
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
          alt="imported"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          loading="lazy"
        />
      </Box>
    ))
  ), [images]);

  const renderedDbImages = useMemo(() => (
    dbImages.map((img) => (
      <Box
        key={img.substring(0, 50)}
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
          alt="searchable"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          loading="lazy"
        />
      </Box>
    ))
  ), [dbImages]);

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

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<UploadFileIcon />}
          onClick={() => fileInputRef.current?.click()}
          sx={{ mr: 2 }}
        >
          Import Files or Images
        </Button>
        <Button variant="outlined" onClick={handleExport} disabled={dbImages.length === 0}>
          Export Search Database
        </Button>
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
            Imported Images ({images.length}):
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            {renderedImportedImages}
          </Box>
        </>
      )}

      {dbImages.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 4 }}>
            Images in Search Database ({dbImages.length}):
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            {renderedDbImages}
          </Box>
        </>
      )}
    </Paper>
  );
}
