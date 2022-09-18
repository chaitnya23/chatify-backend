
const router = require('express').Router();

const auth_router  = require("../routes/auth.routes");
const user_router  = require("../routes/user.routes");
const chat_router  = require("../routes/chat.routes"); 


router.use("/api/auth" ,auth_router);
router.use("/api/user" ,user_router);
router.use("/api/chat" ,chat_router); 

module.exports = router;
