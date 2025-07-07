const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const components = JSON.parse(fs.readFileSync(path.join(root, 'components.json'), 'utf-8'));
const storiesMeta = JSON.parse(fs.readFileSync(path.join(root, 'stories-metadata.json'), 'utf-8'));

function getPropValues(p) {
  if (p.defaultValue?.value != null) return `Default: ${p.defaultValue.value}`;
  if (p.type?.name) return `Type: ${p.type.name}`;
  return 'N/A';
}

function buildStorySection(stories = []) {
  if (!stories.length) return ['Stories: N/A'];

  const lines = ['Stories:'];

  for (const s of stories) {
    lines.push(`  -- Story: ${s.name || s.story || 'Unnamed'}`);
    if (s.tags?.length) lines.push(`     Tags: ${s.tags.join(', ')}`);
    if (s.snippet) {
      lines.push('     Snippet:');
      lines.push(...s.snippet.split('\n').map((l) => `       ${l}`));
    }
    if (s.example) {
      lines.push('     Example:');
      lines.push(...s.example.split('\n').map((l) => `       ${l}`));
    }
    lines.push('');
  }
  return lines;
}

function buildText({ componentName, filePath, propsArr, stories }) {
  const out = [
    `Component: ${componentName}`,
    `Import: ${filePath}`,
    '',
    'Props:',
    ...propsArr.flatMap((p) => [
      `  -- ${p.name}`,
      `     Values: ${p.values}`,
      `     Description: ${p.description}`,
      '',
    ]),
    ...buildStorySection(stories),
  ];
  return out.join('\n');
}

const docs = [];

for (const [name, data] of Object.entries(components)) {
  const propsArr = Object.entries(data.props || {}).map(([n, p]) => ({
    name: n,
    values: getPropValues(p),
    description: p.description || 'N/A',
  }));

  const storyMeta = storiesMeta[name] || {};
  const stories = storyMeta.stories || [];

  docs.push({
    component: name,
    text: buildText({ componentName: name, filePath: data.filePath, propsArr, stories }),
  });
}

fs.writeFileSync(path.join(root, 'rag-docs.json'), JSON.stringify(docs, null, 2));

const csv = ['component,text', ...docs.map(({ component, text }) => {
  const c = component.replace(/"/g, '""');
  const t = text.replace(/"/g, '""').replace(/\n/g, '\\n');
  return `"${c}","${t}"`;
})].join('\n');

fs.writeFileSync(path.join(root, 'rag-docs.csv'), csv);

console.log('Generated rag-docs.json and rag-docs.csv'); 