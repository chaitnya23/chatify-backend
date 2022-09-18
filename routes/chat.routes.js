const Chat = require('../controllers/chat.controller');

const router = require('express').Router();

router.get('/get/:id' ,Chat.getChatById);
router.get('/get/mychats/:id' ,Chat.getMyChats);

router.post('/get' ,Chat.getchat);
router.post('/add/message/:id' ,Chat.addMsg);
router.post('/group/create' ,Chat.createGroupChat);


module.exports = router;