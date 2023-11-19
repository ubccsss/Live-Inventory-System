// app.js

// Import the Express library
const express = require('express');

// Create an instance of Express
const app = express();

// Define a route that responds with "Hello, World!"
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Set up the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
