import fs from 'fs';
import path from 'path';

const root = process.cwd();
const outputDir = path.join(root, 'dist');

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}

fs.mkdirSync(outputDir);

const allowed = new Set(['.git', '.gitmodules', '.github', 'node_modules', '.venv', '.idea', 'dist']);

const copyRecursive = (source, target) => {
  const stat = fs.lstatSync(source);
  if (stat.isDirectory()) {
    const name = path.basename(source);
    if (allowed.has(name) || name.startsWith('.openai')) {
      return;
    }
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(target, entry));
    }
  } else {
    fs.copyFileSync(source, target);
  }
};

copyRecursive(path.join(root, 'index.html'), path.join(outputDir, 'index.html'));
copyRecursive(path.join(root, 'assets'), path.join(outputDir, 'assets'));
copyRecursive(path.join(root, 'images'), path.join(outputDir, 'images'));
copyRecursive(path.join(root, 'CNAME'), path.join(outputDir, 'CNAME'));
