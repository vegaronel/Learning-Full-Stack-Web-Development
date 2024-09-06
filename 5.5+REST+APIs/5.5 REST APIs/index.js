import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const user_Name_Password = "admin123"
const API_KEY = "da6f9f51-7be5-4f5c-b504-8dec4831516a";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "db6e884d-b89c-432e-8834-5171fb8e60df";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const result = await axios.get(API_URL + "/random");
  const finalResult = JSON.stringify(result.data);
  res.render("index.ejs", { content: finalResult});
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId,config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: "Data not found"});
  }
});

app.post("/post-secret", async (req, res) => {
  
  try {
    const result = await axios.post(API_URL + "/secrets",req.body, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) { 
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.put(
      API_URL + "/secrets/"+ searchId,
      req.body, 
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: error});
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
 try {
  const result = await axios.patch(
    API_URL + "/secrets/"+ searchId,
    req.body, 
    config
  );
  res.render("index.ejs", { content: JSON.stringify(result.data) });
 } catch (error) {
  res.render("index.ejs", { content: error});
 }
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(
      API_URL+"/secrets/"+searchId, 
      config
    );
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } catch (error) {
    res.render("index.ejs", {content: error});
  }
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
