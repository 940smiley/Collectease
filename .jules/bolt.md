## 2025-05-15 - LocalStorage and I/O Optimization in ImportExport
**Learning:** Reading from or writing to LocalStorage keys containing large arrays (like 'collectease-image-search-db') is synchronous and blocks the main thread. Sequential file processing with FileReader also introduces significant latency.
**Action:** Use lazy initialization for useState (e.g., `useState(() => readFromStorage())`) to avoid blocking the initial render. Parallelize file operations using `Promise.all` and batch state/LocalStorage updates to minimize I/O and re-renders.

## 2025-05-15 - Image Rendering Performance
**Learning:** Large lists of images (like in a collection or import view) can cause memory pressure and slow down initial page load.
**Action:** Add `loading="lazy"` to all image tags that are not immediately critical to the initial view to improve performance and responsiveness.
