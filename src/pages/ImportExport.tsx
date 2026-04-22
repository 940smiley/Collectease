import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { getCollectionItems, replaceCollectionItems, type CollectionItem } from '../store/collectionStore';

const imageSearchDBKey = 'collectease-image-search-db';

function saveImagesToSearchDB(images: string[]): string[] {
  const existing = JSON.parse(localStorage.getItem(imageSearchDBKey) || '[]') as string[];
  const updated = [...existing, ...images];
  localStorage.setItem(imageSearchDBKey, JSON.stringify(updated));
  return updated;
}

function getImagesFromSearchDB(): string[] {
  return JSON.parse(localStorage.getItem(imageSearchDBKey) || '[]') as string[];
}

export default function ImportExport() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const collectionImportRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [searchable, setSearchable] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });
  const [dbImages, setDbImages] = useState<string[]>(getImagesFromSearchDB());

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsImporting(true);
    const newImages: string[] = [];

    const filePromises = Array.from(files).map(
      (file) =>
        new Promise<void>((resolve) => {
          const reader = new FileReader();
          if (file.type.startsWith('image/')) {
            reader.onload = (readerEvent) => {
              const imageUrl = readerEvent.target?.result as string;
              newImages.push(imageUrl);
              resolve();
            };
            reader.onerror = () => resolve();
            reader.readAsDataURL(file);
          } else {
            reader.onload = () => resolve();
            reader.onerror = () => resolve();
            reader.readAsText(file);
          }
        }),
    );

    await Promise.all(filePromises);
    setImages((prev) => [...prev, ...newImages]);

    const imageCount = newImages.length;
    const otherCount = files.length - imageCount;

    if (searchable && imageCount > 0) {
      saveImagesToSearchDB(newImages);
      setDbImages(getImagesFromSearchDB());
    }

    const message =
      imageCount > 0 && otherCount > 0
        ? `Imported ${imageCount} images and ${otherCount} files.`
        : imageCount > 0
          ? `Imported ${imageCount} image${imageCount > 1 ? 's' : ''} successfully!`
          : `Imported ${otherCount} file${otherCount > 1 ? 's' : ''} successfully!`;

    setSnackbar({ open: true, message, severity: 'success' });
    setIsImporting(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCollectionExport = () => {
    const items = getCollectionItems();
    if (items.length === 0) {
      setSnackbar({ open: true, message: 'No collection items to export yet.', severity: 'error' });
      return;
    }

    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `collectease-collection-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: 'Collection exported successfully.', severity: 'success' });
  };

  const handleCollectionImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as CollectionItem[];
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid payload');
      }
      replaceCollectionItems(parsed);
      setSnackbar({ open: true, message: 'Collection imported successfully.', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Invalid JSON file. Import failed.', severity: 'error' });
    }

    if (collectionImportRef.current) {
      collectionImportRef.current.value = '';
    }
  };

  const handleSearchDBExport = () => {
    if (dbImages.length === 0) return;
    const dataStr = JSON.stringify(dbImages, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `search-db-images-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: 'Image database exported successfully.', severity: 'success' });
  };

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Import & Export
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Move collection data between devices and stage media for searchable imports.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ my: 2 }}>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleCollectionExport}>
          Export Collection JSON
        </Button>
        <Button variant="outlined" startIcon={<BackupTableIcon />} onClick={() => collectionImportRef.current?.click()}>
          Import Collection JSON
        </Button>
      </Stack>
      <input
        type="file"
        accept=".json"
        ref={collectionImportRef}
        style={{ display: 'none' }}
        onChange={handleCollectionImport}
      />

      <FormControlLabel
        control={<Checkbox checked={searchable} onChange={(_, checked) => setSearchable(checked)} color="primary" />}
        label="Mark imported images as searchable (for image recognition/search)"
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        startIcon={isImporting ? <CircularProgress size={20} color="inherit" /> : <UploadFileIcon />}
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
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
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
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
                <img src={img} alt={`imported-${idx}`} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%' }} />
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
                <img src={img} alt={`dbimg-${idx}`} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </Box>
            ))}
          </Box>
        </>
      )}

      <Button variant="outlined" sx={{ mt: 4 }} onClick={handleSearchDBExport} disabled={dbImages.length === 0}>
        Export Search Database
      </Button>

      <Alert severity="info" sx={{ mt: 3 }}>
        Tip: collection exports are launch-ready backups you can keep in versioned cloud storage.
      </Alert>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
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
