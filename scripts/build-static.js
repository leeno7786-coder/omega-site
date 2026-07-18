import fs from 'fs';
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const serverDir = path.join(distDir, 'server');
const openaiDir = path.join(distDir, '.openai');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

fs.mkdirSync(distDir);
fs.mkdirSync(serverDir);
fs.mkdirSync(openaiDir);

const pageHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Omega AI LLC — Autonomous Cognitive Architecture</title>
    <meta
      name="description"
      content="Omega AI LLC builds autonomous AI systems. Omega 3.0 is a metacognitive runtime with episodic memory, deterministic cognition loops, and evidence-grounded motor learning."
    />
    <style>
      :root { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color-scheme: dark; }
      body { margin: 0; background: #050a15; color: #e8f0ff; }
      main { min-height: 100vh; display: grid; place-items: center; padding: 2rem; }
      .card { width: min(860px, 100%); background: #0c1b36; border-radius: 18px; border: 1px solid #2a4f8f; padding: 2rem; box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
      h1 { margin: 0 0 0.5rem; font-size: clamp(2rem, 5vw, 3rem); }
      p { color: #abc0df; line-height: 1.6; }
      a { color: #9ad1ff; }
    </style>
  </head>
  <body>
    <main>
      <section class="card">
        <h1>Omega AI LLC</h1>
        <p>Building reliable, measurable autonomy for next-generation AI systems.</p>
        <p><strong>Omega 3.0</strong> combines deterministic cognition loops, episodic memory, and evidence-grounded learning.</p>
        <p>Deployment is now connected to the Codex Sites workflow. Tell me what sections you want on the landing page and I’ll polish it next.</p>
        <p><a href="mailto:hello@omega2ai.com">hello@omega2ai.com</a></p>
      </section>
    </main>
  </body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), pageHtml);
fs.writeFileSync(path.join(openaiDir, 'hosting.json'), fs.readFileSync(path.join(root, '.openai', 'hosting.json'), 'utf8'));

const robots = 'User-agent: *' + String.fromCharCode(10) + 'Disallow: /';

const serverSource = `export default {
  async fetch(request) {
    const page = ${JSON.stringify(pageHtml)};
    const headers = { 'content-type': 'text/html; charset=utf-8' };

    const url = new URL(request.url);
    if (url.pathname === '/robots.txt') {
      return new Response(${JSON.stringify(robots)}, { status: 200, headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }

    return new Response(page, { status: 200, headers });
  }
};
`;

fs.writeFileSync(path.join(serverDir, 'index.js'), serverSource);
