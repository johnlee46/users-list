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
    res.send(`<form action="/message" method="POST">
                <input type="text" name="info">
                <input value="submit" type="submit" />
                </form>`
            );	
});*/
/*
app.post('/message', (req,res) => {
    let data = req.body.info;
    people.push(data)

    let ul = "<ul>";

    for(let i=0;i<people.length; i++)
        ul+="<li>" + people[i] + "</li>";

    ul+="</ul>"

    res.send(ul);
});*/
app.get('/addUser/:name/:description/:url',(req,res) => {
    fs.readFile('users.json', (err, data) =>{
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
app.get('/deleteUser/:index',(req,res) => {
    fs.readFile('users.json', (err, data) =>{
        json = JSON.parse(data)
        json.artists.splice(req.params.index,1)
        //res.send((JSON.stringify(myObj)))
    
        fs.writeFile("users.json", JSON.stringify(json))
        //next();
        res.send((JSON.stringify(json)))
    })
    
});
app.get('/',(req,res) => {

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
