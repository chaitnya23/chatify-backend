const JWT = require('jsonwebtoken');
require('dotenv').config()


const generateToken = async(user)=>{

    try {
        
        const token = await JWT.sign({_id:user._id} ,process.env.SECRET);
        
        return token;

    } catch (error) {
        
        console.log(error);
    }
}

module.exports = {generateToken};