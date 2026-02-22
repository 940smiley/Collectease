## 2025-05-14 - Improved User Feedback in Import/Export
**Learning:** Replacing disruptive browser `alert()` calls with MUI `Snackbar` and providing visual loading indicators (spinners) on action buttons significantly improves the perceived responsiveness and professionalism of the application. Disabling action buttons (like Export) when they are not applicable prevents user confusion and invalid actions.
**Action:** Always favor non-intrusive notifications (Snackbars) over `alert()` for success/error messages and ensure every asynchronous action has a corresponding loading state in the UI.
