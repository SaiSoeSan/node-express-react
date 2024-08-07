const exp = require('constants');
const express = require('express')
const app = express();
const PORT = 3000;
var router = require('./router.js')

// to get request parameters
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(router)


app.listen(PORT,() => {
    console.log(`server is running on localhost:${PORT}`)
})