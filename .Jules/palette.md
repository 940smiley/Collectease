## 2025-05-15 - [Snackbar Feedback over Alerts]
**Learning:** Replacing standard browser `alert()` with MUI Snackbar and Alert components provides a non-intrusive, theme-consistent user feedback mechanism that doesn't block the main thread or user interaction.
**Action:** Always prefer Snackbar/Alert for success/error notifications in MUI-based projects.

## 2025-05-15 - [Async Button Loading States]
**Learning:** Adding a loading indicator (e.g., CircularProgress) within buttons during asynchronous operations (like file processing) provides essential visual feedback, signaling that the app is working and preventing multiple accidental clicks.
**Action:** Implement `disabled` state and a loading spinner for all buttons triggering async tasks.
