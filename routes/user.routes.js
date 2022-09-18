const User = require('../controllers/user.controller');
const verify = require('../lib/auth.middleware');

const router = require('express').Router();

router.get("/" ,verify ,User.get);
router.get("/search/:name" ,User.search);


module.exports = router;