const Chat = require('../db/models/chat');
const User = require('../db/models/user');


const _Chat_ = {

    async getchat(req ,res){

        const {user ,receiver} = req.body;

        try {
            
            const chat = await Chat.findOne({$and:[{users:user} ,{users:receiver}]}).populate("users messages.user");

            if(!chat){
                const newChat = await Chat.create({
                    users:[user ,receiver]
                })
                res.status(200).send(newChat);

                return;
            }

            res.status(200).send(chat);

        } catch (error) {

            res.status(402).send({message:error.message});
        }
    } ,

    async getMyChats(req ,res){

        const {id} = req.params;

        try {
            
            const chats = await Chat.find({users:id}).populate("users messages.user");
            res.status(200).send(chats);

        } catch (error) {
            
            res.status(404).send("error in featching user chats")
        }
    },

    async getChatById(req ,res){

        const {id} = req.params;

        try {
            
            const chat = await Chat.findById(id).populate("users messages.user");
            res.status(200).send(chat);

        } catch (error) {

            res.status(402).send({message:error.message});
        }
    } ,


    async addMsg(req ,res){

        const {id} = req.params;
        const {message ,user } = req.body;

        try {
            
            const add = await Chat.findByIdAndUpdate(id ,{
                $push:{
                    messages:{
                        user,
                        message
                    }
                }
            });

            res.status(200).send("msg added");

        } catch (error) {
            res.status(402).send({message:error.message});
            
        }
    } ,

    async createGroupChat(req ,res){

        const {name ,admin ,members} = req.body;

        var Members = [];
         members.forEach(element => {
             Members =  [...Members ,element._id]
        });

        try {
            
            const chat = await Chat.create({
                isGroupChat:true,
                users:[...members],
                groupName:name,
                admin
            })

            res.status(200).send(chat);

        } catch (error) {

            res.status(402).send({message:error.message});
            
        }
    } ,

    async addToGroup(req ,res){

        const {chat_id ,member} = req.body;
        
        try {
            
            const chat = await Chat.findByIdAndUpdate(chat_id ,{
                $addToSet:{
                    users:member
                }
            })

            res.status(200).send(chat);

        } catch (error) {
 
            res.status(402).send({message:error.message});
            
        }
    }
}

module.exports = _Chat_;