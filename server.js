// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//post
const data = []

app.post('/add',addInfo);
function addInfo(request, response) {
    projectData ['date'] = request.body.date;
    projectData ['temprature'] = request.body.temprature;
    projectData ['content'] = request.body.content;
response.send(projectData);
}
// calling back

app.get('/all', getInfo);
function getInfo(request, response) {
    response.send(projectData);
}
// Setup Server
const port = 8000;
const server = app.listen(port, serverListening);

function serverListening() {
    console.log(`hello from localhost port: ${port}`);
  };