let p = [];

function addPlayer(e) {
    p.push(e);
}

function getAllPlayers() {
    return p;
}

module.exports = {
    add : addPlayer,
    getall : getAllPlayers
}