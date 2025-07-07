const fs = require('fs');
const path = require('path');

// Path to the extracted stories.json (adjust if your output path differs)
const storiesJsonPath = path.resolve(__dirname, '../storybook-static/stories.json');
const outputPath = path.resolve(__dirname, '../stories-metadata.json');

if (!fs.existsSync(storiesJsonPath)) {
  console.error(`Error: stories.json not found at ${storiesJsonPath}.\nMake sure to run:\n  1. pnpm build-storybook -o storybook-static\n  2. pnpm exec storybook extract storybook-static .storybook/generated/stories.json`);
  process.exit(1);
}

/**
 * Convert Storybook's stories index into a simplified metadata object keyed by component name.
 *
 * The resulting structure looks like:
 * {
 *   "RmaxButton": {
 *     "title": "Design System/Routemax/RmaxButton",
 *     "importPath": "src/design-system/Routemax/RmaxButton.stories.tsx",
 *     "stories": [
 *       { "id": "design-system-routemax-rmaxbutton--primary", "name": "Primary" },
 *       { "id": "design-system-routemax-rmaxbutton--outlined", "name": "Outlined" }
 *     ]
 *   },
 *   ...
 * }
 */
function convertStoriesToMetadata(storiesJson) {
  const metadata = {};
  const root = path.resolve(__dirname, '..');
  const fileCache = new Map(); // importPath -> file content

  for (const storyId of Object.keys(storiesJson.stories)) {
    const story = storiesJson.stories[storyId];
    const titleParts = story.title.split('/');
    const componentName = titleParts[titleParts.length - 1];

    // Resolve absolute path of the story file (remove leading './')
    const absImportPath = path.resolve(root, story.importPath.replace(/^\.\//, ''));

    // Read file content once per file
    if (!fileCache.has(absImportPath) && fs.existsSync(absImportPath)) {
      fileCache.set(absImportPath, fs.readFileSync(absImportPath, 'utf-8'));
    }

    if (!metadata[componentName]) {
      metadata[componentName] = {
        title: story.title,
        importPath: story.importPath,
        kind: story.kind,
        tags: new Set(),
        stories: [],
        // Raw source code of the story file for AI examples
        source: fileCache.get(absImportPath) || '',
      };
    }

    // Aggregate unique tags
    if (Array.isArray(story.tags)) {
      story.tags.forEach((t) => metadata[componentName].tags.add(t));
    }

    // Attach code snippet
    let snippet = '';
    let example = '';
    const fileContent = fileCache.get(absImportPath);
    if (fileContent) {
      const lines = fileContent.split(/\r?\n/);
      const startRegex = new RegExp(`export\\s+const\\s+${story.name}\\s*(:|=)`, 'i');
      let startIndex = lines.findIndex((l) => startRegex.test(l));
      if (startIndex !== -1) {
        // Collect until next export const or export default or end
        let endIndex = startIndex + 1;
        while (endIndex < lines.length && !/^export\s+(const|default)\s+/i.test(lines[endIndex])) {
          endIndex++;
        }
        snippet = lines.slice(startIndex, endIndex).join('\n');

        // Attempt to extract args object for example code
        const argsMatch = snippet.match(/args\s*:\s*({[\s\S]*})/m);
        if (argsMatch) {
          const argsObj = argsMatch[1];

          // Find default import component alias
          const importMatch = fileContent.match(/import\s+([A-Za-z0-9_]+)\s*(?:,|\s+from)/);
          const compAlias = importMatch ? importMatch[1] : 'Component';

          example = `const ${story.name}Example = () => (\n  <${compAlias} {...${argsObj}} />\n);`;
        }
      }
    }

    metadata[componentName].stories.push({ ...story, snippet, example });
  }

  // Convert Sets to arrays for JSON serialization
  for (const comp of Object.keys(metadata)) {
    metadata[comp].tags = Array.from(metadata[comp].tags);
  }

  return metadata;
}

try {
  const raw = JSON.parse(fs.readFileSync(storiesJsonPath, 'utf-8'));
  const metadata = convertStoriesToMetadata(raw);

  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  console.log(`Generated metadata for ${Object.keys(metadata).length} components → ${outputPath}`);
} catch (err) {
  console.error('Failed to convert stories.json:', err);
  process.exit(1);
} 