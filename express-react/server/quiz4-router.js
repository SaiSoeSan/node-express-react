const express = require('express')

const options = {
    "caseSentisive" : true,
    "strict" : true
}

let tickets = [];

let summary = [];

let total = 0;

const addOrUpdateTicket = (newTicket) => {
    total += parseInt(newTicket.price);
    const index = tickets.findIndex(ticket => ticket.name === newTicket.name);
    if (index !== -1) {
     let price = parseInt(tickets[index].price);
     tickets[index].price = price + parseInt(newTicket.price);
     tickets[index].quantity += 1;
    } else {
      tickets.push({
        name : newTicket.name,
        price : newTicket.price,
        quantity : 1
      });
    }
  };

var path = require('path');
const router = express.Router(options);


router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,"../client/build/index.html"))
})

router.post('/api/tickets',(req,res) => {
    for(let addingTicket of req.body){
        addOrUpdateTicket(addingTicket)
    }
    res.json({tickets : tickets,total : total})
});

router.get('/api/tickets',(req,res) => {
    res.json({tickets : tickets,total : total})
});




module.exports = router;