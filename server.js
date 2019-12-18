const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const url = require("url");
const querystring = require("querystring");
const PORT = 3212;
const FILE = "./feedbacks.json";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  }
  return cont;
};
//converts Date object to miliseconds and checks which is bigger
// third parameter is boolean used to determine weather dateFrom or dateTo should be checked
let checkDateBoundaries = (obj, queryDate, dateFrom) => {
  let objTime = new Date(obj.date).getTime();
  let queryTime = new Date(queryDate).getTime();
  let answer = false;

  if (dateFrom ) {
    answer = objTime > queryTime;
  } else if (!dateFrom ) {
    answer = objTime < queryTime;
  }
  return answer;
};

//calls function that searches for matches on each elemen in array
const filterItems = (arr, query) => {
  return arr.filter(el => lookForMatches(el, query));
};
//methods that check for date interval conditions
const filterDateFrom = (arr, query) => {
  return arr.filter(el => checkDateBoundaries(el, query, true));
};
const searchDateTo = (arr, query) => {
  return arr.filter(el => checkDateBoundaries(el, query, false));
};

app.get("/feedbacks?", async function(req, res) {

  let file = await readFromFile();

  
  if (req.query.searchText.length !== 0) {

//if textfield is not empty, filters through comments and returns only those that match query
    file = filterItems([...file], req.query.searchText);

  }
  //if searchDateFrom is not empty, filters through comments and returns only those that match date boundaries
  if (req.query.searchDateFrom !== "null") {
    file = filterDateFrom([...file], req.query.searchDateFrom);
  }
  if (req.query.searchDateTo !== "null") {
    file = searchDateTo([...file], req.query.searchDateTo);
  }
// if all search fields are empty, then all the comments should be returned
  res.json({
    success: true,
    body: file
  });

});


app.listen(PORT, () => console.log(`Server app listening on port ${PORT}!`));

