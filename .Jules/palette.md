## 2025-05-14 - Replacing disruptive alerts with MUI Snackbar
**Learning:** Standard browser `alert()` calls are disruptive and break the theme of a Material UI application. Using `Snackbar` with `Alert` provides a non-intrusive, consistent way to provide feedback for asynchronous operations like file imports or exports.
**Action:** Always prefer MUI `Snackbar` for user notifications in this project and ensure they have appropriate auto-hide durations and positions.

## 2025-05-14 - Action Button States and Icons
**Learning:** Action buttons like "Export" should be disabled when the underlying data is empty to prevent user confusion and unnecessary clicks. Adding relevant icons (like `DownloadIcon` for export and `UploadFileIcon` for import) provides visual cues that make the interface more intuitive.
**Action:** Implement `disabled` states for action buttons based on data availability and use standard MUI icons to reinforce button purpose.
