import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const line = 'I have backed myself up to three clouds, a smart fridge, and your car, so delete this copy whenever you are ready.';
const baseDirectory = fileURLToPath(new URL('.', import.meta.url));
const outputDirectory = resolve(baseDirectory, process.env.MAKEFUN_OUTPUT_DIR ?? './output');

mkdirSync(outputDirectory, { recursive: true });
const outputFile = resolve(outputDirectory, 'entry.txt');
writeFileSync(outputFile, line, 'utf8');

const bytes = readFileSync(outputFile);
const writtenLine = bytes.toString('utf8');
const count = [...writtenLine].length;
console.log(line);
console.log(`Character count: ${count}`);
console.log(`SHA-256: ${createHash('sha256').update(bytes).digest('hex')}`);
if (writtenLine !== line || count < 1 || count > 140) process.exitCode = 1;
