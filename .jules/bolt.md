## 2025-05-22 - LocalStorage Blocking Mitigation
**Learning:** In applications that store large datasets (like Base64 images) in LocalStorage, synchronous read/write operations can severely impact main thread responsiveness. Using lazy initialization for useState and deferring LocalStorage writes (e.g., via setTimeout or useEffect) significantly improves perceived performance.
**Action:** Always lazy-initialize state that reads from LocalStorage. Defer writes to avoid blocking immediate UI updates after a state change.
