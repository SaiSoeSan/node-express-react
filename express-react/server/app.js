const express = require('express');
const app = express();
const PORT = 8000;
let path = require('path')
const cors = require('cors');
const router4 = require('./quiz4-router.js')
const router3 = require('./quiz3-router.js')

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

let availablity = [
    {
        deparatureDate : new Date('2024-08-07'),
        destination : "Fairfield",
        availableSeat : 3
    },
    {
        deparatureDate : new Date('2024-08-08'),
        destination : "Fairfield",
        availableSeat : 3
    },
]

//Use CORS middleware with options
app.use(cors(corsOptions));


//Read the parameters from post request
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// app.use(router3);
// app.use(router4);


// const updateTicket = (searchTicket) => {
//     let searchSeat = availablity.find(ticket => {
//         return ticket.deparatureDate.getTime() == search
//     })
// }

app.post('/search/availability',(req,res) => {
    let selectedDate = new Date(req.body.deparatureDate)
    let filteredTicket = availablity.filter((item,key) => item.deparatureDate.getTime() === selectedDate.getTime() && item.availableSeat > 0)
    res.json(filteredTicket)
})

app.post('/book',(req,res) => {
    let selectedDate = new Date(req.body.deparatureDate) 
    updateAvailability(req.body)
    availablity = availablity.map((ticket) => {
        if(ticket.deparatureDate.getTime() == selectedDate.getTime()){
            return {...ticket,availableSeat : parseInt(ticket.availableSeat) - req.body.noOfSeat}
        }
        return ticket;
    })
    let filteredTicket = availablity.filter((item,key) => item.deparatureDate.getTime() === selectedDate.getTime() && item.availableSeat >= 0)
    res.json(filteredTicket)
})

const updateAvailability = (bookingTicket) => {
    
}


// //quiz3
// app.get('/',(req,res) => {
//     res.sendFile(path.join(__dirname,"../client/build/language.html"))
// })



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