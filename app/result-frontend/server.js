const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the /app/build directory
app.use(express.static(path.join(__dirname)));

// API route to provide configuration data
app.get('/api/config', (req, res) => {
  res.json({
    BACKEND_PROTOCOL: process.env.BACKEND_PROTOCOL || 'http',
    BACKEND_HOST: process.env.BACKEND_HOST || 'localhost',
    BACKEND_PORT: process.env.BACKEND_PORT || '5001'
  });
});

// Serve the index.html file for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
