const User = require('../db/models/user');


const _User_ = {

    async getAll(req, res) {

        try {

            const users = await User.find({});

            res.staus(200).send(users);

        } catch (error) {

            res.staus(404).send({ message: error.message });
        }

    },

    get(req, res) {

        const user = req.rootUser;
        if (user) {
            res.status(200).send(user);
        } else {

            console.log(error);
            res.status(402).send("error in verification")
        }

    } ,

    async search(req ,res){

        const {name} = req.params;

        try {
            const users = await User.find({$or:[
                {
                    name: {
                        $regex : new RegExp(name) 
                    }
                } ,
                {
                    userName: {
                        $regex : new RegExp(name) 
                    }
                }
            ]})    

            res.status(200).send(users);

        } catch (error) {
            res.status(402).send("error in searching")
            
        }
    }


}

module.exports = _User_;