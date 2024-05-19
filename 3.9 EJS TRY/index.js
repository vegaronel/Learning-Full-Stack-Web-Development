import ejs from "ejs";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res)=>{


    const d = new Date();
    let day = d.getDay();

    var days = "a weekdays";
    var type = "It's time to hardwork";

    if(day === 0 || day === 6){
      days = "Weekend";
      type = "It's time to rest";
    }

    res.render("index.ejs", {
        
        daysW: days, 
        typeR:type
    });

});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})