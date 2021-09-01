/* Global Variables */
const webForm = document.querySelector('.app');
// get city by ZIP code --> api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key} 
const apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=309be7712c57260fdb5652b7864e2f5f&units=metric';
// Create a new date instance dynamically with JS
let date = new Date();
let newDate = (date.getMonth()+1)+'.'+ date.getDate()+'.'+ date.getFullYear();
document.getElementById('generateBtn').addEventListener('click', onClickActions);

function onClickActions(data){
    data.preventDefault();
//getting the required place to throw temprature and content
    const cityZIP = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
//logging url for check of validaty
    console.log(apiURL+cityZIP+apiKey);
    //HTTP request from the API
    weatherFromAPI (apiURL,cityZIP,apiKey)
        .then (function (userData){
            postData('/add', { date: newDate, temprature: userData.main.temp, content })
        })
        .then(function (data) {
            // update browser UI
            Update()
          })
}
// get city by ZIP code --> api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key} 
//declaration of the API function
const weatherFromAPI = async (apiURL,cityZIP,apiKey) => {
    //request fetching "GET"
    const response = await fetch(apiURL+cityZIP+apiKey);    
    //using try for catching errors if found
    try {
        const userData = await response.json();
        return userData;

        //throwing errors
    }catch (error) {
        console.log("Error Type:",error);
    }
}

// post data 
const postData = async (url = '', data = {}) => {
    //Post request shape
    const request = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temprature: data.temprature,
        content: data.content
      })
    })
      //using try for catching errors if found
    try {
      const newData = await request.json();
      return newData;
    }
        //throwing errors
    catch (error) {
        console.log("Error Type:",error);
    }
  };

  //update User Interface
  const Update = async () => {
    const request = await fetch('/all');
    //using try for catching errors if found
    try {
      const collectedData = await request.json()
      // entry values update
      document.getElementById('date').innerHTML = collectedData.date;
      document.getElementById('temprature').innerHTML = collectedData.temprature;
      document.getElementById('content').innerHTML = collectedData.content;
    }
         //throwing errors
    catch (error) {
        console.log("Error Type:",error);
    }
  };