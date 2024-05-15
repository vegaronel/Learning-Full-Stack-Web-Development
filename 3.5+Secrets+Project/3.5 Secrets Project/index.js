//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming


import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
var password = ""
var userIsAuthorised = false;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended:true}));

function checkPassword(req, res, next){
    console.log(req.body);
    password = req.body["password"];

    if(password === "ILoveProgramming"){
       userIsAuthorised = true;
    }
    next();
}

app.get("/", (req, res)=>{

 res.sendFile(__dirname + "/public/index.html");
       
    })

app.use(checkPassword);



app.post("/check", (req, res)=>{

    if(userIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
    }else{
        res.sendFile(__dirname + "/public/index.html");

    }

})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

