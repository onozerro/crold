const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8081;
const DIR = __dirname;

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.glb': 'model/gltf-binary', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp'
};

http.createServer((req, res) => {
  const filePath = path.join(DIR, decodeURIComponent(req.url === '/' ? '/index.html' : req.url));
  if (!fs.existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Access-Control-Allow-Origin': '*'
  });
  fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => {
  console.log(`\n  Viewer server запущен!\n\n  http://localhost:${PORT}/\n`);
});
