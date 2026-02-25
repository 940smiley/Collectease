## 2025-05-22 - Optimizing ImportExport LocalStorage and File Processing
**Learning:** Sequential file reading with manual counters in React is inefficient and error-prone. Combining `Promise.all` with functional state updates and lazy initialization significantly improves responsiveness and data integrity when dealing with LocalStorage-backed state.
**Action:** Always prefer lazy state initialization for components that read from LocalStorage and use `Promise.all` for parallelizing asynchronous side effects like file reading.
