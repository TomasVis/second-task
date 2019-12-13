const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')
const url = require('url');
const querystring = require('querystring');


const PORT = 3212;
const FILE = './feedbacks.json';

//app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())*/

/*app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});*/

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



app.post('/feedbacks', async function(req, res) {
  //console.log(req.body)
   await writeToFile(req.body);
       res.json({
           success: true,
           body: req.body
       });
});


let lookForMatches =  (a,b) => {
  let cont = false;
  for (let prop in a) {
  
 if(a[prop].toLowerCase().indexOf(b.toLowerCase()) !== -1) cont = true
    //console.log(el.values[prop] )
}
 return  cont ;

}
//console.log(funk(arr.values,"bab"))
const filterItems = (arr, query) => {
  return arr.filter(el => lookForMatches(el.values,query));
};


app.get('/feedbacks?', async function(req, res) {
  console.log(req.query)
  let file = await readFromFile()
  //console.log(file)
  // if req.query is empty than it should return all the comments
  if(Object.entries(req.query).length === 0 && req.query.constructor === Object){ // tests for empty object
    console.log("query was emty, all the comments returned")
         console.log(file)
      res.json({
       success: true,
       body: file
   });
  }
    // if both text and date were entered
  else if(req.query.searchText.length > 0 && req.query.searchDate.length > 0  ){
      console.log("text and date were entered")
      res.json({
        success: true,
        body: "search by date and text"
      });


  }
    // if only text was entered
  else if(req.query.searchText.length > 0 && req.query.searchDate.length == 0  ){
    
    //console.log("ne tuscias")
    //console.log(req.query.searchText)
    let foundComments = filterItems(file, req.query.searchText)
    
    if(foundComments.length < 1 ){
      console.log("ner tokiu komentaru")
      res.json({
        success: true,
        body: "komentaru nebuvo rasta"
      });

    }
    else{
      console.log(foundComments)
      res.json({
       success: true,
       body: foundComments
   });
    }
    
    
  }
  else if(req.query.searchText.length == 0 && req.query.searchDate.length > 0  ){
    console.log("search by date")

  }

  else{
    console.log("smth unexpected")
       res.json({
       success: true,
       body: "error"
   });


  }



});

app.get("/api/timestamp/:date_string?", function (req, res) {

  var date = 0;
  if(req.params.date_string == undefined){
    date = new Date()
  }
  else if(isNaN(req.params.date_string)){
    date = new Date( Date.parse(req.params.date_string));
  }
  else if (!isNaN(req.params.date_string)){
    date = new Date(Number(req.params.date_string))
  }
 
  res.send({"unix": date.getTime(), "utc" : date.toUTCString() })
});
// Shows that back end is connected
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