let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let playerRoutes = require('./routes/players');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req,res) => {
    return res.send('<a href="/players/add">Add a player</a>' +
    '<h2>Welcome to player land !</h2>');
});

app.use(playerRoutes);

app.listen(3000, () => console.log('Server ready'))



