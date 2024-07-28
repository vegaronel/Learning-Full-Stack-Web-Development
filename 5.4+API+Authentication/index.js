import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "admin123";
const yourPassword = "admin123";
const yourAPIKey = "9404e8b7-a575-44f0-bc13-f87e3e85dc1e";
const yourBearerToken = "7cdd2946-4bdd-4692-9945-73712c0adb28";

app.get("/", async (req, res) => {
     try {
          const response = await axios.get("https://secrets-api.appbrewery.com/random");
          const content = response.data;
          const result = JSON.stringify(content);
          res.render("index.ejs", { content: result });
     } catch (error) {
          console.error("Failed to make request:", error.message);
          res.render("index.ejs", {
               error: error.message,
          });
     }
});

app.get("/noAuth", async (req, res) => {
     try {
          const response = await axios.get("https://secrets-api.appbrewery.com/random");
          const content = response.data;
          const convertToString = JSON.stringify(content);
          console.log(convertToString);
          res.render("index.ejs", { content: convertToString });
     } catch (error) {
          console.error("Failed to make request:", error.message);
          res.render("index.ejs", {
               error: error.message,
          });
     }
     //TODO 2: Use axios to hit up the /random endpoint
     //The data you get back should be sent to the ejs file as "content"
     //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
     axios.get("https://secrets-api.appbrewery.com/all?page=1", {
          auth: {
               username: yourUsername,
               password: yourPassword,
          },
          params: { username: yourUsername },
     })
          .then((response) => {
               const result = response.data;
               const lastRes = JSON.stringify(result);
               res.render("index.ejs", { content: lastRes });
          })
          .catch((error) => {
               res.render("index.ejs", { content: "Wrong Credentials" });
          });
});

app.get("/apiKey", async (req, res) => {
     try {
          const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
          const content = response.data;
          var randomNumber = Math.random() * content.length;
          randomNumber = Math.floor(randomNumber);

          console.log(content[randomNumber]);
          res.render("index.ejs", { content: content[randomNumber].secret });
     } catch (error) {
          console.error("Failed to make request:", error.message);
          res.render("index.ejs", {
               error: error.message,
          });
     }
     //TODO 4: Write your code here to hit up the /filter endpoint
     //Filter for all secrets with an embarassment score of 5 or greater
     //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
     const config = {
          headers: { Authorization: `Bearer ${yourBearerToken}` },
     };

     const bodyParameters = {
          key: "value",
     };
      try {
        const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", config);
        var result = response.data;
        result = result.secret;
        res.render("index.ejs", { content: result });
        
      } catch (error) {
        res.render("index.ejs", { error: error });
      }
    
     //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
     //and get the secret with id of 42
     //HINT: This is how you can use axios to do bearer token auth:
     // https://stackoverflow.com/a/52645402
     /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
});
