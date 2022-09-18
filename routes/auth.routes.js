const Auth = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/signup' ,Auth.signup);
router.post('/login' ,Auth.login);
router.get('/logout' ,Auth.logout);



module.exports = router; 