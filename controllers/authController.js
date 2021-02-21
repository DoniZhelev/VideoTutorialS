const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config')
const { validationResult } = require('express-validator');
const validationRegister = require('../validation/validationRegister');
const validationLogin = require('../validation/validationLogin');





router.get('/login' , (req, res ) =>{
    res.render('login')
});

router.post('/login',validationLogin, (req, res, next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
       return res.render('login', {
            message: errors.array()[0].msg
        })
    }

    const { username, password} = req.body;
    
    authService.login(username, password)  
    .then(token => {

        res.cookie(COOKIE_NAME, token, { httpOnly: true});
        res.redirect('/')
    })
    .catch(err => 
        res.render('login',  {message: 'Username or password are incorect!'}))
    
});

router.get('/register', (req,res) =>{
    res.render('register');
});

router.post('/register', validationRegister, (req, res, next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
       return res.render('register', {
            message: errors.array()[0].msg
        })
    }

    const {username, password} = req.body;

    authService.register(username, password)
    .then(createdUser =>{
        res.redirect('/login')
    })
    .catch(err => next(err))
 
});

router.get('/logout', (req, res) =>{
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
})

module.exports = router;