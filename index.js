let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const fs = require('fs');
let people = []
var json;
app.use(bodyParser.urlencoded({extended:false}));  // middleware

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
        let datareq = req.body;
        var myObj = {
            "name": datareq.name,
            "description":datareq.description,
            "url": datareq.url
        }
        //console.log(myObj)
        users.push(myObj)
        res.send(users)
        fs.writeFile('users.json',JSON.stringify(users))
        
    })
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
app.delete('/deleteName/:name',(req,res) => {
    fs.readFile('users.json', (e, data) => {
        if (e) throw e;
        json = JSON.stringify(data);
        //console.log(json)
        users = json
    })
    for(var i in users){
        if(users[i].name.toLowerCase() == req.params.name.toLowerCase()){
            console.log(users[i].name.toLowerCase())
            users.splice(i,1)
            break;
        }
    }

    fs.writeFile('users.json',JSON.stringify(users))  
    res.send(users)
})
app.get('/users',function(req,res) {
    fs.readFile('users.json', (e, data) => {
        if (e) throw e;
        json = JSON.parse(data);
        //console.log(json)
        users = json
        json = JSON.stringify(users);
        res.send(json)
    })

    
})
app.get('/search/:name',(req,res) => {
    var returnusers = []
    fs.readFile('users.json', (e, data) => {
        if (e) throw e;
        json = JSON.parse(data);
        for(var i in json){
           
            if(JSON.stringify(json[i]).toLowerCase().includes(req.params.name.toLowerCase())){
                returnusers.push(json[i])
                console.log(JSON.stringify(json[i]))
            }
        }
        json = returnusers;
        res.send(json)
    })

})
app.get('/',(req,res) => {
    fs.readFile('users.json', (e, data) => {
        if (e) throw e;
        json = JSON.parse(data);
        res.sendfile("contacts.html")
    });
    
})
app.listen(process.env.PORT || 3000);
