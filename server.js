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

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
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
/*
GET http://localhost:3212/feedbacks - duomenų gavimui,

POST http://localhost:3212/feedbacks - duomenų įrašymui

O dabar sukurk atsiliepimų formą:

Pasitelkęs material UI principus (galima naudoti ir bibliotekas, daugiau naudingos info https://material.io/collections/developer-tutorials/#web) formoje pateik šiuos laukelius:

Vardas
El.paštas
Data (turi būti pateikiama automatiškai)
Komentaras (6 eilutės)
Taip pat pateik sąrašą, kuriame pagal įvedamus duomenis būtų galimybė matyti visus atsiliepimus.
Panaudok anksčiau susikurtą script'ą ir padaryk taip, kad pateikti atsiliepimai būtų saugomi tekstiniame dokumente.
Jei nori didesnio iššūkio - išbandyk React'ą! Front-End dalį suprogramuok su React.js įrankiu:

Panaudok duomenis (https://github.com/facebook/create-react-app) ir pagal pateiktą instrukciją įsidiek atsiliepimų formą.
Naudodamas app.js bylą sudėliok visą logiką, jei reikia koreguok ir struktūrą.
Savo sprendimą patalpink pasirinktoje kodo saugykloje (pvz. Github) arba kitame viešai prieinamame išoriniame šaltinyje ir pasidalink šia nuoroda su mumis.
*/