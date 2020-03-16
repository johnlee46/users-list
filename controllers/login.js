let loginModel = require('../models/loginData');


exports.login = (req,res,next) => {
    console.log(req.body.username + req.body.password);
    let check = loginModel.checklogin(req.body.username)
        check.then( ([rows, fieldData]) => {
            console.log(rows[0].password)
            if(rows[0].password = req.body.password){
                res.redirect(301, '/peoples');
            } else {
                res.render('home',{wrong_password :true})
            }
           
        });
 };

 exports.logout = (req,res,next)=>{
     res.render('home');
 }