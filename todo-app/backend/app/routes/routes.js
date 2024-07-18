
const controllers = require('./controller.js');

const router = require('express').Router();

const { validateData } = require('./schema');

const { authUserToken } = require('../middlewares/createToken.js')

const { verifyToken } = require('../middlewares/chekInputToken.js')

const userIdFromToken = require('../middlewares/userIdFromToken.js');

// authorization
const { authMiddleware } = require('../middlewares/auth.js');

const todoControllers = require('./todoControllers.js')



// #################    signup user    #################
router.post('/signup', validateData, authMiddleware, controllers.createUser);


// #################    login user    #################
router.post('/login', verifyToken, authMiddleware, userIdFromToken, controllers.loginUser);


// #################    Create token   #################
router.post('/token', authUserToken, authMiddleware, userIdFromToken);




// #################      TODO     #################

// #################    Add TODO   #################
router.post('/todo/create', userIdFromToken, todoControllers.createTodo);


// #################    Edit TODO   #################
router.put('/todo/edit/:id', userIdFromToken, todoControllers.editTodo);


// #################    Delete TODO   #################
router.delete('/todo/delete/:id', userIdFromToken, todoControllers.deleteTodo);


// #################    List TODO   #################
router.get('/todo/list', userIdFromToken, todoControllers.getUserTodo);



// #################    Search TODO   #################
router.get('/todo/search/:searchValue', userIdFromToken, todoControllers.getSearchTodo);




module.exports = router;


