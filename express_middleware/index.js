let express = require('express');
let app = express();

app.use((req,res,next) => {
    req.me = 'Terry';  // added a new property to the request
    console.log('In middleware 1');
    next(); // Need to call next() otherwise the request won't travel down 
})

app.use((req,res,next) => {
    req.age = 25; // added a new property to the request
    console.log('In middleware 1');
    next(); // Need to call next() otherwise the request won't travel down 
})

app.get('/', (req,res) => {
    // req.me and req.age were added via our custom middleware
    res.send('Hi I am ' + req.me + ' and I am ' + req.age + 'years old');
})

app.listen(9000);