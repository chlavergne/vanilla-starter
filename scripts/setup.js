import { execSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

async function run() {
  console.log('\n🚀 Initializing new project...\n');

  const githubUser = (await ask('GitHub username: ')).trim();
  const repoName = (await ask('Repository name: ')).trim();

  if (!githubUser || !repoName) {
    console.error('❌ Error: Both GitHub username and repository name are required.');
    process.exit(1);
  }

  // 1. Update package.json (name + remove setup script)
  const pkgPath = resolve('package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  pkg.name = repoName;
  if (pkg.scripts) {
    delete pkg.scripts.setup;
  }
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

  // 2. Update vite.config.js base path
  const vitePath = resolve('vite.config.js');
  let viteConfig = readFileSync(vitePath, 'utf-8');
  viteConfig = viteConfig.replace(
    /base:\s*process\.env\.NODE_ENV\s*===\s*'production'\s*\?\s*'.*?'\s*:\s*'\/'/,
    `base: process.env.NODE_ENV === 'production' ? '/${repoName}/' : '/'`
  );
  writeFileSync(vitePath, viteConfig);

  // 3. Update README.md badges and repository placeholders
  const readmePath = resolve('README.md');
  let readme = readFileSync(readmePath, 'utf-8');
  readme = readme
    .replaceAll('USERNAME', githubUser)
    .replaceAll('vanilla-starter', repoName);
  writeFileSync(readmePath, readme);

  console.log('\n⚙️ Configuring Git and Lefthook hooks...');

  // 4. Initialize Git repository and install Lefthook hooks
  try {
    execSync('git init -b main', { stdio: 'ignore' });
    execSync('pnpm lefthook install', { stdio: 'ignore' });
    console.log('✓ Initialized clean Git repository on branch main');
    console.log('✓ Installed Lefthook pre-commit hooks');
  } catch (err) {
    console.warn('⚠️ Could not initialize Git or Lefthook:', err.message);
  }

  rl.close();

  // 5. Self-delete the scripts directory
  try {
    rmSync(__dirname, { recursive: true, force: true });
    console.log('✓ Cleaned up setup scripts');
  } catch (err) {
    console.warn('⚠️ Could not remove scripts directory automatically:', err.message);
  }

  // 6. Create initial commit
  try {
    execSync('git add .', { stdio: 'ignore' });
    execSync('git commit -m "feat: initial commit with Vite, Biome, and Lefthook"', { stdio: 'ignore' });
    console.log('✓ Created initial Git commit');
  } catch (err) {
    console.warn('⚠️ Could not create initial commit:', err.message);
  }

  console.log('\n✅ Setup completed successfully!');
  console.log(`Ready to develop: run "pnpm dev" to start.\n`);
}

run();