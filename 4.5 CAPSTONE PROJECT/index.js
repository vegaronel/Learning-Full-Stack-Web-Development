import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";



const app = express();
const port = 3000;
let posts = [];
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.post("/submit", (req, res)=>{

  
    const createPost = {id: Date.now().toString(),title: req.body["tweet"],content: req.body["name"] };

    posts.push(createPost);
   

    res.redirect('/');
})

app.delete('/posts/:id', (req, res) => {
    posts = posts.filter(post => post.id !== req.params.id);
    res.redirect('/');
});


app.get("/newpost", (req, res)=>{

    res.render("newpost.ejs");
})

app.get("/", (req, res)=>{
    res.render('index.ejs', { posts });
})


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

