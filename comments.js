// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Create server
const server = http.createServer((req, res) => {
  // Get URL
  const parsedUrl = url.parse(req.url, true);
  // Get path
  let pathName = parsedUrl.pathname;
  // Get method
  const method = req.method;
  // Get query
  const query = parsedUrl.query;

  // Get comments
  if (pathName === '/comments' && method === 'GET') {
    // Read file
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: 'Internal server error' }));
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(data);
      }
    });
  }

  // Add comment
  if (pathName === '/comments' && method === 'POST') {
    // Read file
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: 'Internal server error' }));
      } else {
        // Parse file
        const comments = JSON.parse(data);
        // Add new comment
        comments.push(query.comment);
        // Write file
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
          if (err) {
            res.writeHead(500, {
              'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({ message: 'Internal server error' }));
          } else {
            res.writeHead(200, {
              'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({ message: 'Comment added' }));
          }
        });
      }
    });
  }
});

// Listen server
server.listen(3000, () => console.log('Server is running on http://localhost:3000'));