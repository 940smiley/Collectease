## 2025-05-14 - [Improved Feedback in Import/Export]
**Learning:** Replacing standard browser `alert()` with MUI `Snackbar` and `Alert` significantly improves the user experience by providing non-intrusive, theme-consistent feedback. Additionally, providing visual feedback during asynchronous operations (like `CircularProgress` on buttons) prevents duplicate submissions and keeps the user informed.
**Action:** Always prefer `Snackbar` over `alert()` for success/error notifications and include loading states for any process taking more than 200ms.
