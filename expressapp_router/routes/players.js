let express = require('express');
let router = express.Router();

let mod = require('../players');

router.get('/players/add', (req,res) => {
     res.send(`<form action="/players/add" method="POST"> 
                <input type="text" name="player_name" /> <input type="submit"  value="submit" /> 
            </form>`)
});

router.post('/players/add', (req, res) => {
    const player_name = req.body.player_name;
    mod.add(player_name);
    res.redirect(301, '/players/all');
});

router.get('/players/all', (req,res) => {
    let players = mod.getall();
    let ret ="<a href='/players/add'>Add another</a><br>";
    ret+= "<ul>";
    for (let i =0; i< players.length; i++) {
        ret+="<li>" + players[i] + "</li>"
    }
    ret+="</ul>";

    res.send(ret);
});

module.exports = router;
