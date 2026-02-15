## 2025-05-14 - Replacing intrusive alerts with Snackbars
**Learning:** Browser 'alert()' calls are disruptive to the user flow and feel out-of-place in a modern MUI-based application. Using a non-intrusive Snackbar provides a much smoother experience and keeps the user in the context of their work.
**Action:** Always prefer MUI Snackbar and Alert for non-blocking feedback in this project.

## 2025-05-14 - Tool Output Truncation Awareness
**Learning:** Large file outputs in the tool execution trace may be truncated to around 1000 characters, which can lead to incomplete understanding of the code if not careful.
**Action:** Use 'read_file' with offsets or 'sed' to read large files in manageable chunks to ensure full groundedness when planning changes.
