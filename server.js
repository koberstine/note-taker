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
       console.log("GET")
       fs.readFile('./db/db.json', "utf8", (err, data) => {
         if (err) {
           throw err;
         }
         let parsedData = JSON.parse(data);
         console.log(parsedData)
         res.json(parsedData)
       });
});
 
app.post("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", function(err, data) {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes.push(req.body);
        notes.forEach((note, index) => {
            note.id = index;
        })
        fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
            if(err) throw err;
        })
    })
    res.json(req.body)
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
