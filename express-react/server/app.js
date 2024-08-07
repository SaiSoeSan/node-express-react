const express = require('express');
const app = express();
const PORT = 8000;
let path = require('path')
const cors = require('cors');

let selectedLanguage = '';
let selectedData = '';

// Define CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the allowed origin
    methods: 'GET,POST,DELETE,PUT',
    allowedHeaders: 'Content-Type',
};

let items = [
{ name: 'dd', price: 30, quantity : 6 },
{ name: 'dddd', price: 30, quantity : 7 }
];

//Use CORS middleware with options
app.use(cors(corsOptions));


//Read the parameters from post request
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//quiz3
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"../client/build/language.html"))
})

app.post('/skills',(req,res) => {
    let language = req.body.language;
    selectedLanguage = language;
    if(language == 'Java'){
        res.sendFile(path.join(__dirname,"../client/build/skillJava.html"))
    }else{
        res.sendFile(path.join(__dirname,"../client/build/skillJavascript.html"))
    }
});

app.post('/preview',(req,res) => {
    if(selectedLanguage == 'Java'){
        selectedData = {
            "Core Java" : req.body.skill,
            "Java Build Tools" : req.body.buildTool
        }
    }else{
        selectedData = {
            "HTML / CSS" : req.body.skill,
            "Source Control" : req.body.buildTool
        }
    }
    console.log(selectedData)
    res.sendFile(path.join(__dirname,"../client/build/index.html"))
})

app.get('/api/skill',(req,res) => {
    res.json({data:selectedData})
})

app.use(express.static(path.join(__dirname, '../client/build')));


app.get('/api/items', (req, res) => {
    res.json({ data: items });
});

app.post('/api/item/add', (req, res) => {
    items.push(req.body)
    res.json({data : items});
});

app.delete('/api/item/delete', (req, res) => {
    let filterItems = [...items].filter((item,key) => key != req.body.key);
    items = filterItems;
    res.json({data: items})

    // const index = items.findIndex((produc,key) => key === req.body.key);
    // if(index != -1){
    //     items.splice(index,1)
    // }
    // console.log(items)
});

app.put('/api/item/:id', (req, res) => {
    // items = [...items].map((item,key) => {
    //     if(key == req.params.id){
    //         return {...item,...req.body}
    //     }
    //     return item;
    // })
    for(let i = 0; i < items.length; i++){
        if(i == req.params.id){
            items[i] = {...items,...req.body}
            break;
        }
    }
    res.json({data: items})
});

// app.get('*', (req, res) => {

//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));

// });





app.listen(PORT,() => {
    console.log(`my server is running on localhost:${PORT}`)
})