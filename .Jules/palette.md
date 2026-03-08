## 2025-05-14 - Improved User Feedback in Import/Export
**Learning:** Replacing disruptive browser `alert()` calls with MUI `Snackbar` and providing visual loading indicators (spinners) on action buttons significantly improves the perceived responsiveness and professionalism of the application. Disabling action buttons (like Export) when they are not applicable prevents user confusion and invalid actions.
**Action:** Always favor non-intrusive notifications (Snackbars) over `alert()` for success/error messages and ensure every asynchronous action has a corresponding loading state in the UI.
## 2025-05-15 - [Improving Feedback with Snackbars]
**Learning:** Browser alerts are disruptive and can lead to a poor user experience, especially in a modern SPA. Replacing them with non-blocking MUI Snackbars provides a more seamless and pleasant interaction.
**Action:** Always prefer non-blocking feedback mechanisms like Snackbars or Toasts over browser alerts for routine user interactions.

## 2025-05-15 - [Accessible Alt Text Patterns]
**Learning:** Generic alt text like `imported-0` is not helpful for screen reader users. Using a template like `Imported item 1` provides slightly better context.
**Action:** When item names are not available, use descriptive placeholder templates for alt text to ensure basic accessibility.
