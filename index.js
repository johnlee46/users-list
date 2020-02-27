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
app.use(express.static('public'))

var users = [];
fs.readFile('users.json', (e, data) => {
    if (e) throw e;
    json = JSON.parse(data);
    users = json;
    //res.send(data.toString());
});

app.post('/submitUser',(req,res) => {
    fs.readFile('users.json', (e, data) => {
        if (e) throw e;
        json = JSON.parse(data);
        //console.log(json)
        users = json
    })
    let data = req.body;
        var myObj = {
            "name": data.name,
            "description":data.description,
            "url": data.url
        }
        //console.log(myObj)
        users.push(myObj)
        fs.writeFile('users.json',JSON.stringify(users))
        res.send(users)
})
app.get('/deleteUser/:index',function (req,res){
    fs.readFile('users.json', (e, data) => {
        if (e) throw e;
        json = JSON.stringify(data);
        //console.log(json)
        users = json
    })
    users.splice(req.params.index,1)
    console.log(users)
    fs.writeFile('users.json',JSON.stringify(users))
});
app.get('/users',function(req,res) {
    fs.readFile('users.json', (e, data) => {
        if (e) throw e;
        json = JSON.parse(data);
        //console.log(json)
        users = json
    })
    json = JSON.stringify(users);
    res.send(json)
    
})
app.get('/',(req,res) => {
    fs.readFile('users.json', (e, data) => {
        if (e) throw e;
        json = JSON.parse(data);
        //console.log(json)
        //res.send(data.toString());
    });
    res.sendfile("contacts.html")
})
app.listen(process.env.PORT || 3000);
