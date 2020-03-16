const express = require('express');
const peopleController = require('../controllers/people');
const loginController = require('../controllers/login');
const router = express.Router();

router.get('/peoples', peopleController.getAllPeople);

router.get('/people/add', peopleController.getAddPeople);

router.get('/people/:id', peopleController.getPeople);

router.post('/peoples/add', peopleController.postAddPeople);

router.get('/delete/:id',peopleController.deletePeople);

router.post('/login',loginController.login);

router.get('/logout',loginController.logout);


module.exports = router;
