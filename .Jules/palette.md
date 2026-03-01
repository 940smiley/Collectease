## 2025-05-14 - Tooltip on Disabled Elements
**Learning:** MUI Tooltips (and many other CSS-based tooltips) do not trigger on disabled elements because they don't fire mouse events.
**Action:** Wrap the disabled element in a `<span>` or `<div>` and attach the Tooltip to the wrapper to ensure users understand why an action is unavailable.

## 2025-05-14 - Batch Operation Feedback
**Learning:** When performing batch asynchronous operations (like multi-file uploads), providing feedback only at the end of the process via a single Snackbar prevents UI flickering and "notification fatigue".
**Action:** Use `Promise.all` to aggregate results and show a single summary notification after all operations complete.
