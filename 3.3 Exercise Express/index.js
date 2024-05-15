
import express from "express";

const app = express();

const port = 3000;



app.get("/", (req, res)=>{
    res.send("<h1>This is the Home Page</h1>");
})

app.get("/about", (req, res)=>{
    res.send("<h1>About Me</h1> <br> <p>I am Ronel G. Vega </p>");
})

app.get("/contact", (req,res)=>{
    res.send("<h1>Contact me</h1>");
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})