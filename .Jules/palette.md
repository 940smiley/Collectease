## 2025-05-15 - Improving Async File Import Feedback
**Learning:** Browser `alert()` blocks the main thread and provides a poor user experience, especially during async operations like file reading. Users need non-intrusive feedback and clear loading indicators for multi-file imports.
**Action:** Replace `alert()` with MUI Snackbar/Alert and implement loading states with `CircularProgress` for all file-based operations.
