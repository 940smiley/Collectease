## 2025-02-14 - Replace standard browser alerts with MUI Snackbar
**Learning:** Browser `alert()` is disruptive and inconsistent with modern UI frameworks like MUI. Replacing it with Snackbar and Alert components provides a more pleasant and integrated user experience.
**Action:** Always check for browser `alert()` or `confirm()` and replace them with theme-consistent UI components.

## 2025-02-14 - Add loading indicators to async buttons
**Learning:** Users need visual feedback when an asynchronous operation is in progress (like file reading). Disabling the button and showing a spinner prevents duplicate actions and clarifies state.
**Action:** Implement loading states for all buttons that trigger asynchronous logic.

## 2025-02-14 - Generic alt text in image grids
**Learning:** Generic alt text like "image-1" provides little value to screen reader users. Using more descriptive labels like "Imported collectible item 1" improves accessibility.
**Action:** Use descriptive alt text that provides context, even for dynamically loaded items.
