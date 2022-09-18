const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({

    groupName:{
        type:String,
        trim:true
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        } 
    ],
    messages:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            message:String 
        }
    ]

} ,{timestamps:true})



const Chat = new mongoose.model('Chat' ,ChatSchema);
module.exports = Chat;