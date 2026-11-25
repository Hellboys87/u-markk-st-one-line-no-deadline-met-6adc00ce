import { mkdirSync, writeFileSync } from "node:fs";
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
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
