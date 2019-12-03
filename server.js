const express = require('express');
const app = express();
const fs = require('fs');

const PORT = 3212;
const FILE = './feedbacks.json';

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

async function writeToFile(body) {
   const comments = await readFromFile();
   comments.push(body);
   const error = fs.writeFileSync(FILE, JSON.stringify(comments));
   return error;
}

async function readFromFile() {
   const rawdata = await fs.readFileSync(FILE);
   const comments = JSON.parse(rawdata);

   return comments;
}

app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/feedbacks', async function(req, res) {
   await writeToFile(req.body);
       res.json({
           success: true,
           body: req.body
       });
});

app.get('/feedbacks', async function(req, res) {
   res.json({
       success: true,
       body: await readFromFile()
   });
});

app.listen(PORT, () => console.log(`Server app listening on port ${PORT}!`));
/*O dabar sukurk atsiliepimų formą:

Pasitelkęs material UI principus (galima naudoti ir bibliotekas, daugiau naudingos info https://material.io/collections/developer-tutorials/#web) formoje pateik šiuos laukelius:

Vardas
El.paštas
Data (turi būti pateikiama automatiškai)
Komentaras (6 eilutės)
Taip pat pateik sąrašą, kuriame pagal įvedamus duomenis būtų galimybė matyti visus atsiliepimus.
Panaudok anksčiau susikurtą script'ą ir padaryk taip, kad pateikti atsiliepimai būtų saugomi tekstiniame dokumente.*/