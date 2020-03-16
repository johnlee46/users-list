let db = require('../util/database');

// Add a single individual to the database
function addPeople(data) {
    let sql = "Insert into people (name, about, imageURL) values ('" + data.name+ "','"+ data.about+ "','" + data.imageURL + "')";
    return db.execute(sql);
}

// Gets all the individuals in the database
function getAllPeople() {
    return db.execute('Select * from people');
}

// Gets a specific individual from the database
function getPeople(id) {
    return db.execute("Select * from people where id = " + id);
}

function deletePeople(id) {
    return db.execute("DELETE FROM people where id = " + id);
}

module.exports = {
    add : addPeople,
    getall : getAllPeople,
    getpeople: getPeople,
    deletepeople: deletePeople
}