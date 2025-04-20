const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Path to your Miniflare D1 DB directory
const dir = path.join(".wrangler", "state", "v3", "d1", "miniflare-D1DatabaseObject");

if (!fs.existsSync(dir)) {
  console.error("D1 database directory not found. Make sure Miniflare has run.");
  process.exit(1);
}

// Find the first .sqlite file
const files = fs.readdirSync(dir).filter(f => f.endsWith(".sqlite"));
const firstFile = files[0];

if (!firstFile) {
  console.error("No .sqlite file found in the D1 directory.");
  process.exit(1);
}

const dbFile = path.join(dir, firstFile);

// Set the env var and run Drizzle Studio
process.env.DB_LOCAL_PATH = dbFile;
execSync(`npx drizzle-kit studio --port 3094`, { stdio: "inherit" });