## 2025-03-03 - Lazy State Initialization for LocalStorage
**Learning:** Initializing state directly with `localStorage.getItem()` in the component body causes a synchronous, thread-blocking read on every re-render. This is especially problematic as the stored data grows (e.g., a collection of base64 images).
**Action:** Always use the lazy initializer pattern `useState(() => getFromLocalStorage())` for any state derived from synchronous external APIs like LocalStorage.
