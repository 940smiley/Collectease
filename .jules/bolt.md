# Bolt's Journal - Critical Learnings

## 2025-05-14 - Redundant Storage Reads in React State Updates
**Learning:** Calling a state initializer that reads from LocalStorage (e.g., `useState(getImages())`) runs on every render, even though the result is only used once. Additionally, updating LocalStorage by reading the existing value first (e.g., `save(new)` which reads `old` internally) is inefficient if the `old` value is already in React state.
**Action:** Always use lazy initialization `useState(() => getImages())` for expensive I/O. When updating, use the current React state to construct the new value for both `setState` and `localStorage.setItem` to avoid redundant reads.
