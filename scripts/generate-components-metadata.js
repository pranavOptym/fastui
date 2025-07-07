const { withCustomConfig } = require('react-docgen-typescript');
const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');

(async () => {
  const root = path.resolve(__dirname, '..');
  const parser = withCustomConfig(path.join(root, 'tsconfig.json'), {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
  });

  const files = await fg(['src/design-system/**/*.{ts,tsx}', '!**/*.stories.*', '!**/*.test.*', '!**/__tests__/**'], { cwd: root });

  const metadata = {};

  files.forEach(file => {
    try {
      parser.parse(path.join(root, file)).forEach(doc => {
        metadata[doc.displayName] = { filePath: file, props: doc.props };
      });
    } catch {}
  });

  fs.writeFileSync(path.join(root, 'components.json'), JSON.stringify(metadata, null, 2));
  console.log(`Generated metadata for ${Object.keys(metadata).length} components → components.json`);
})(); 