const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Create a server
const server = http.createServer((req, res) => {
    if (req.url.match(/\/api\/v1\/[^/]+\/actions\/blueprints\/[^/]+\/graph/) && req.method === 'GET') {
        const filePath = path.join(__dirname, 'graph.json');

        // Read the graph.json file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: 'Failed to load graph.json'}));
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(data);
        });
    } else {
        // Serve static files from /public
        let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: 'Resource not found!'}));
                return;
            }
            // Basic content type handling
            let ext = path.extname(filePath);
            let contentType = 'text/html';
            if (ext === '.js') contentType = 'application/javascript';
            if (ext === '.css') contentType = 'text/css';
            if (ext === '.json') contentType = 'application/json';
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        });
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
