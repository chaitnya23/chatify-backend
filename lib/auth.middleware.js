const JWT = require('jsonwebtoken');
const User = require('../db/models/user');
require('dotenv').config()

const verify  = async(req ,res ,next)=>{

    try {
        
        const token = req.cookies.chatify;


        const {_id} = JWT.verify(token ,process.env.SECRET);

        const user = await User.findById(_id) ;
        req.rootUser = user;
        next();

    } catch (error) {
        
        res.status(402).send("error in user verification");
    }
}

module.exports = verify;