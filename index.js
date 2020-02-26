let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const fs = require('fs');
let people = []
var json;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));  // middleware

// parse application/json
app.use(bodyParser.json()); // middleware


/*
app.get('/', (req,res) => {
    res.send(`<form action="/addUser" method="POST">
                <input type="text" name="name">
                <input type="text" name="description">
                <input type="text" name="url">
                <input value="submit" type="submit" />
                </form>`
            );	
});

app.post('/addUser',(req,res) => {
    fs.readFile('users.json', (err, data) =>{
        if (err) throw err;
        json = JSON.parse(data)
        var myObj = {
            "name": req.body.name,
            "description":req.body.description,
            "url": req.body.url
        }
        json.artists.push(myObj)
        //res.send((JSON.stringify(myObj)))
    
        fs.writeFile("users.json", JSON.stringify(json))
        //next();
        res.send((JSON.stringify(json)))
    })
    
});
*/ 
app.get('/addUser/:name/:description/:url',function(req,res) {
    fs.readFile('users.json', (err, data) =>{
        if (err) throw err;
        json = JSON.parse(data)
        var myObj = {
            "name": req.params.name,
            "description":req.params.description,
            "url": req.params.url
        }
        json.artists.push(myObj)
        //res.send((JSON.stringify(myObj)))
    
        fs.writeFile("users.json", JSON.stringify(json))
        //next();
        res.send((JSON.stringify(json)))
    })
    
});
app.get('/deleteUser/:index',function (req,res){
    fs.readFile('users.json', (err, data) =>{
        if (err) throw err;
        json = JSON.parse(data)
        json.artists.splice(req.params.index,1)
        //res.send((JSON.stringify(myObj)))
    
        fs.writeFile("users.json", JSON.stringify(json))
        //next();
        res.send((JSON.stringify(json)))
    })
    
});
app.get('/',function(req,res) {

    // **modify your existing code here**
    fs.readFile('users.json', (e, data) => {
        if (e) throw e;
        json = JSON.parse(data);
        res.send(JSON.stringify(json))
        //res.send(data.toString());
    });
    
    //let data = req.body.info;
    //res.send(data)
})

app.listen(process.env.PORT || 3000);
