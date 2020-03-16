let db = require('../util/database');

function checkLogin(username){
    return db.execute("SELECT password from users where username = '" + username + "'")
}

module.exports = {
    checklogin : checkLogin,
}