const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const url = require("url");
const querystring = require("querystring");

const PORT = 3212;
const FILE = "./feedbacks.json";

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

app.post("/feedbacks", async function(req, res) {
  //console.log(req.body)
  await writeToFile(req.body);
  res.json({
    success: true,
    body: req.body
  });
});

// searches for a match in every property of an object (except "date" property)
let lookForMatches = (obj, text) => {
  let cont = false;
  for (let prop in obj) {
    if (
      obj[prop].toLowerCase().indexOf(text.toLowerCase()) !== -1 &&
      prop !== "date"
    )
      cont = true;
    //console.log(el.values[prop] )
  }
  return cont;
};

let checkDateBoundaries = (obj, queryDate, dateFrom) =>{
  //console.log(new Date(queryDate).getTime());
  //console.log(new Date(obj.date).getTime());
  let objTime = new Date(obj.date).getTime() 
  let queryTime = new Date(queryDate).getTime();
  //console.log(new Date(obj.date).getTime() < new Date(queryDate).getTime());
  let answer = false
  if(dateFrom){
    answer = objTime > queryTime
  }
  else{
    answer = objTime < queryTime
  }
  //dateFrom ? answer = new Date(queryDate).getTime() < Date(obj.date).getTime() : answer =  new Date(queryDate).getTime() > Date(obj.date).getTime()
return answer
}
//console.log(funk(arr.values,"bab"))
//calls function that searches for matches on each elemen in array
const filterItems = (arr, query) => {
  return arr.filter(el => lookForMatches(el, query));
};
const filterDateFrom = (arr, query) => {
  return arr.filter(el => checkDateBoundaries(el, query, true));
};
const searchDateTo = (arr, query) => {
  return arr.filter(el => checkDateBoundaries(el, query, false));
};

app.get("/feedbacks?", async function(req, res) {
  console.log(req.query);
  let file = await readFromFile();
  //console.log(file)
  // if all search fields are empty, than all the comments should be returned
  //if(Object.entries(req.query).length === 0 && req.query.constructor === Object){ // tests for empty object
  if (req.query.searchText.length !== 0) {
    console.log("text not empty");

    file = filterItems(file, req.query.searchText);
    console.log(file);
  }
  if (req.query.searchDateFrom !== "null") {
    file = filterDateFrom(file, req.query.searchDateFrom);
  }
  if (req.query.searchDateTo !== "null") {
    file = filterDateFrom(file, req.query.searchDateTo);
  }

  res.json({
    success: true,
    body: file
  });
  // if both text and date were entered
  /*  else if(req.query.searchText.length > 0 && req.query.searchDateFrom !== "null"  ){
      console.log("text and date were entered")
      res.json({
        success: true,
        body: "search by date and text"
      });


  }
    // if only text was entered
  else if(req.query.searchText.length > 0 && req.query.searchDateFrom == "null"  ){
    
    //console.log("ne tuscias")
    //console.log(req.query.searchText)
    let foundComments = filterItems(file, req.query.searchText)
    
    if(foundComments.length < 1 ){
      console.log("ner tokiu komentaru")
      res.json({
        success: true,
        body:null
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
  else if(req.query.searchText.length == 0 && req.query.searchDateFrom.length > 0  ){
    console.log("search by date")

  }

  else{
    console.log("smth unexpected")
       res.json({
       success: true,
       body: "error"
   });


  }*/
});

app.get("/api/timestamp/:date_string?", function(req, res) {
  var date = 0;
  if (req.params.date_string == undefined) {
    date = new Date();
  } else if (isNaN(req.params.date_string)) {
    date = new Date(Date.parse(req.params.date_string));
  } else if (!isNaN(req.params.date_string)) {
    date = new Date(Number(req.params.date_string));
  }

  res.send({ unix: date.getTime(), utc: date.toUTCString() });
});
// Shows that back end is connected
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
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
