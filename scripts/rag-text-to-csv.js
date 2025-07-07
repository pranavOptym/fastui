const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const txtPath = path.join(root, 'rag-docs.txt');
const outCsv = path.join(root, 'rag-docs.csv');

if (!fs.existsSync(txtPath)) {
  console.error('rag-docs.txt not found. Run generate-rag-text first.');
  process.exit(1);
}

const content = fs.readFileSync(txtPath, 'utf-8');
const lines = content.split(/\r?\n/);

const rows = [];
let currentComponent = null;
let buffer = [];

function pushRow() {
  if (!currentComponent) return;
  const textBlock = buffer.join('\n').trim();
  if (textBlock) {
    rows.push({ component: currentComponent, text: textBlock });
  }
}

for (const line of lines) {
  const compMatch = line.match(/^Component:\s*(.+)/);
  if (compMatch) {
    // flush previous component
    pushRow();
    currentComponent = compMatch[1].trim();
    buffer = [line];
  } else {
    buffer.push(line);
  }
}
// flush last
pushRow();

// Write CSV
const escapeCsv = (str) => '"' + str.replace(/"/g, '""') + '"';
const csvLines = ['component,text'];
for (const row of rows) {
  csvLines.push(`${escapeCsv(row.component)},${escapeCsv(row.text)}`);
}

fs.writeFileSync(outCsv, csvLines.join('\n'));
console.log(`Generated ${outCsv} with ${rows.length} rows`); 