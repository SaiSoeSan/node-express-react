const { log } = require('console');
const express = require('express')

const options = {
    "caseSentisive" : true,
    "strict" : true
}

var path = require('path');
const router = express.Router(options);


router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"../client/build/language.html"))
})

router.post('/skills',(req,res) => {
    let language = req.body.language;
    selectedLanguage = language;
    if(language == 'Java'){
        res.sendFile(path.join(__dirname,"../client/build/skillJava.html"))
    }else{
        res.sendFile(path.join(__dirname,"../client/build/skillJavascript.html"))
    }
});

router.post('/preview',(req,res) => {
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

router.get('/api/skill',(req,res) => {
    res.json({data:selectedData})
})




module.exports = router;