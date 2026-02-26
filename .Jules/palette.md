## 2025-05-23 - [Snackbar Management]
**Learning:** To prevent UI flickering or overlapping messages during batch operations (like multi-file uploads), aggregate results into a single comprehensive notification message.
**Action:** Use a counter or completion tracker in batch async operations to trigger a single 'success' notification once all items are processed.

## 2025-05-23 - [Input Reset for UX]
**Learning:** In 'src/pages/ImportExport.tsx', after processing file imports, resetting the input element's value (e.g., event.target.value = '') ensures the 'onChange' event triggers correctly if the same file is selected consecutively.
**Action:** Always reset file input values after successful processing to allow re-uploads of the same file.

## 2025-05-23 - [Linter constraints on Ternary Operators]
**Learning:** ESLint in this repo flags ternary operators used for side-effect function calls (statements) as errors.
**Action:** Use standard 'if/else' blocks for side effects to ensure linter compliance.
