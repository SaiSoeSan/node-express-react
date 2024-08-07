const express = require('express');
const app = express();
const PORT = 3000;
let path = require('path')

let result = [];


//Read the parameters from post request
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//global middleware
// app.use((res,req,next) => {
//     console.log("MIDDLEWARE");
//     next();
// })

let count = 0;

//define route
app.get('/', (req,res) => {
    count++;
    res.sendFile(path.join(__dirname,"views","exam.html"))
});
app.get('/preview', (req,res) => {
    res.send(result)
});

app.get('/about', (req,res,next) => {
    console.log("log1")
    next();
},(req,res)=>{
    res.send(
        `<h1>Hello, I'm Sai Soe San</h1>`
    )
});


app.get('/admin', (req,res) => {
    res.sendFile(path.join(__dirname,"views","myForm.html"))
});

app.post('/post', (req,res) => {
    let obj = {
        name : req.body.name,
        age : req.body.age,
        gender : req.body.gender,
        country : req.body.country,
        skill : req.body.skill,
        description : req.body.description,
        options : req.body.options
    }
    console.log(req.body)
    result.push(obj);
    res.redirect('/');
});

app.listen(PORT,() => {
    console.log(`server is running on localhost:${PORT}`)
})