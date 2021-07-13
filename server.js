const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFileSync('db/db.json', (err, data) => {
      if (err) {
        throw err;
      }
      let parsedData = JSON.parse(data);
      return parsedData;
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/api/notes', (req, res) => {
    // placeholder for POST route
    res.send('POST request to page');
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
