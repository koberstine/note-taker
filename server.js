const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', (err, data) => {
      if (err) {
        throw err;
      }
      res.json(data);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/api/notes', (req, res) => {
    res.send('POST request to page');
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
