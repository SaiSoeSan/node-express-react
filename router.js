const { log } = require('console');
const express = require('express')

const options = {
    "caseSentisive" : true,
    "strict" : true
}

var path = require('path');
const { exit } = require('process');
const router = express.Router(options);

let data = [];
let count = 0;
let product = [];
let loggedInUser = '';

let myData = [];

let users = [
    {
        username : "guest",
        password : "guest"
    },
    {
        username : "owner",
        password : "owner"
    }
]

let myArray = {
    guest:['Nuts',"Legumes"],
    owner:['Vegetables','Nuts','Fruits',"Legumes"]
}

router.get('/',(req,res) => {
    // count++;
    // res.sendFile(path.join(__dirname,"views","exam.html"))
    // res.sendFile(path.join(__dirname,"views","evenOdd.html"))
    res.sendFile(path.join(__dirname,"views","login.html"))
})

router.post('/submit',(req,res) => {
    let input = req.body.myInput;
    if(req.body.type === "even"){
        if(input % 2 === 0){
            myData.push({
                [input] : req.body.type
            })
        }else{
            res.send("Opps, something is wrong")
        }
    }else{
        if(input % 2 != 0){
            myData.push({
                [input] : req.body.type
            })
        }else{
            res.send("Opps, something is wrong")
        }
    }
    res.send(myData)
})

router.post('/post',(req,res) => {
    data.push(req.body)
    res.redirect("/preview")
})

router.get('/preview',(req,res) => {
    res.send({data : data, count : count})
})

//product
router.get('/product',(req,res) => {
    res.sendFile(path.join(__dirname,"views","product.html"))
})

router.post('/product/update',(req,res) => {
    let action = req.body.action;

    if(action == 'add'){
        product.push({
            productName : req.body.productName,
            price : req.body.price
        })
    }else if(action == 'edit'){
        // for(let p of product){
        //     if(p.productName == req.body.productName){
        //         p.price = req.body.price;
        //         break;
        //     }   
        // }
        // product.map
        product = [...product].map(p => {
            if(p.productName == req.body.productName){
                return {...p,price : req.body.price}
            }
            return p;
        })
    }else{
        //delete
        product = [...product].filter((item,key) => item.productName != req.body.productName)
    }
    res.redirect('/product/list');
})

router.get('/product/list',(req,res) => {
    res.send(product)
})

//landing page
router.get('/landing',(req,res,next) => {
    if(loggedInUser == ''){
        res.redirect('/login')
    }else{
        next();
    }
},(req,res) => {
    res.send(users)
})

router.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,"views","login.html"))
})

router.post('/login',(req,res) => {
    let userName = req.body.username;
    let password = req.body.password;
    let loggedIn = false;
    for(let user of users){
        if(user.username == userName && user.password == password){
            loggedIn = true;
        }
    }
    if(loggedIn){
        res.redirect('/view')
    }else{
        res.send("login failed")
    }
})

router.get('/view',(req,res) => {
    res.sendFile(path.join(__dirname,"views","view.html"))
})

// router.post('/login',(req,res) => {
//     let loggedIn = true;
//     for(let user of users){
//         if(user.username == req.body.username && user.password == req.body.password){
//             loggedIn = false;
//         }
//     }
//     if(!loggedIn){
//         res.send("Existing User");
//     }else{
//         loggedInUser = {
//             username : req.body.username,
//             password : req.body.password
//         }
//         users.push(loggedInUser)
    
//         res.send("login success")
//     }
// })

router.use((req,res) => {
    res.send("404")
})


module.exports = router;