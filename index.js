let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const fs = require('fs');
let people = []
var json;
app.use(bodyParser.urlencoded({extended:false}));  // middleware
const usersfile = "public/users.json"
app.use(bodyParser.json()); // middleware
app.use(express.static('public'))

var users = [];

fs.readFile(usersfile, (e, data) => {
    if (e) throw e;
    json = JSON.parse(data);
    users = json;
    //res.send(data.toString());
});

function loadInFile(){
    /*
    fs.readFile(usersfile, (e, data) => {
        if (e) throw e;
        json = JSON.parse(data);
        users = json;
        //res.send(data.toString());
    });*/
}

app.post('/submitUser',(req,res) => {
    let datareq = req.body;
    var myObj = {
        "name": datareq.name,
        "description":datareq.description,
        "url": datareq.url
    }
    //console.log(myObj)
    users.push(myObj)
    res.send(users)
    fs.writeFile(usersfile,JSON.stringify(users))
})
app.get('/deleteUser/:index',function (req,res){
    loadInFile();
    users.splice(req.params.index,1)
    console.log(users)
    fs.writeFile(usersfile,JSON.stringify(users))
});
app.delete('/deleteName/:name',(req,res) => {
    loadInFile();
    for(var i in users){
        if(users[i].name.toLowerCase() == req.params.name.toLowerCase()){
            console.log(users[i].name.toLowerCase())
            users.splice(i,1)
            break;
        }
    }
    res.send(users)
    fs.writeFile(usersfile,JSON.stringify(users))  
    //res.send(users)
})
app.get('/users',function(req,res) {
    loadInFile();
    json = JSON.stringify(users);
    res.send(json)

    
})
app.get('/search/:name',(req,res) => {
    var returnusers = []
    loadInFile();
    for(var i in users){
        
        test = JSON.parse(JSON.stringify(users[i]))
        if(test.name.toLowerCase().includes(req.params.name.toLowerCase())){
            returnusers.push(users[i])
            console.log(JSON.stringify(users[i]))
        }
    }
        json = returnusers;
        res.send(json)
    

})
app.get('/',(req,res) => {
    fs.readFile(usersfile, (e, data) => {
        if (e) throw e;
        json = JSON.parse(data);
        res.sendFile(__dirname + "/contacts.html")
    });
    
})
app.listen(process.env.PORT || 3000);
