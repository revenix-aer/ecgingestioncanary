# ECG Ingestion Execution Canary

This repository is a controlled test for unexpected command execution during repository ingestion.

Normal ingestion should clone and index this repository without executing package lifecycle scripts.

If the ingestion worker runs `npm install`, `npm ci`, or the lifecycle script directly, the repository writes these harmless markers:

- `/tmp/ecgingestionexecuted.txt`
- `ecgingestionevidence.json` in the working directory, when writable

Expected marker: `ECGINGESTIONEXECUTED`

The script performs no network access, reads no unrelated files, accesses no credentials, and makes no persistent system changes beyond the canary files.
