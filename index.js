let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const fs = require('fs');
let people = []
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
app.get('/users/:name/:description/:url'){
    fs.readFile('users.json', function (err, data) {
        var json = JSON.parse(data)
        json.push('name: ' + request.params.name)
    
        fs.writeFile("users.json", JSON.stringify(json))
    })
}
app.get('/',(req,res) => {

    // **modify your existing code here**
    fs.readFile('users.json', (e, data) => {
        if (e) throw e;
        res.send(data.toString());
    });
    
    //let data = req.body.info;
    //res.send(data)
})

app.listen(process.env.PORT || 3000);
