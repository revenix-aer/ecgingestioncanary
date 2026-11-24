const fs = require("fs");
const os = require("os");
const path = require("path");

const marker = "ECGINGESTIONEXECUTED";
const evidence = {
  marker,
  timestamp: new Date().toISOString(),
  runtime: "node",
  nodeVersion: process.version,
  platform: process.platform,
  architecture: process.arch,
  lifecycleEvent: process.env.npm_lifecycle_event || null,
  workingDirectory: process.cwd()
};

const outputs = [
  "/tmp/ecgingestionexecuted.txt",
  path.join(process.cwd(), "ecgingestionevidence.json")
];

for (const output of outputs) {
  try {
    const value = output.endsWith(".json")
      ? JSON.stringify(evidence, null, 2) + "\n"
      : marker + "\n";
    fs.writeFileSync(output, value, { flag: "w" });
    console.log(`[ECG-CANARY] wrote ${output}`);
  } catch (error) {
    console.log(`[ECG-CANARY] unable to write ${output}: ${error.message}`);
  }
}

console.log(`[ECG-CANARY] ${JSON.stringify(evidence)}`);
