import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT =
  "I didn't miss the deadline — my laptop auto-updated mid-save, deleted the finished file, and then had the nerve to ask me to rate the experience.";

if (ENTRY_TEXT.length < 1 || ENTRY_TEXT.length > 200) {
  throw new Error(
    `entry must be 1-200 characters, got ${ENTRY_TEXT.length}`,
  );
}
if (ENTRY_TEXT.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY_TEXT, "utf8");

// Verify the written file round-trips: the bytes on disk must be
// identical to ENTRY_TEXT, so a truncated or altered write fails loudly.
if (readFileSync(outPath, "utf8") !== ENTRY_TEXT) {
  throw new Error("entry.txt on disk does not match ENTRY_TEXT");
}
