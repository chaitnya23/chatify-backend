const User = require('../db/models/user');
const { generateToken } = require('../lib/services');

const Auth = {

  //user signn up
  async signup(req, res) {

    const { name, userName, password, profilePic } = req.body;

    try {

      const userExist = await User.findOne({ userName });

      if (userExist) {
        res.status(402).send("user already exist");
      } else {

        const user = await new User({ name, userName, password, profilePic }).save();
        const token = await generateToken(user);

        res.cookie("chatify", token, {
          httpOnly: true
        })
        res.status(200).send(user)

      }
    } catch (error) {

      res.status(404).send("error... in signin");
    }
  },

  async login(req, res) {

    const { userName, password } = req.body;

    try {
      const user = await User.findOne({ $and: [{ userName }, { password }] });
      
      if(user){
        const token = await generateToken(user);
      }
      

      res.cookie("chatify", token, {
        httpOnly: true
      })

      res.status(200).send("logeed in successfully !!!!");

    } catch (error) {

      res.status(404).send(({ message: error.message }));
    }
  },

  async logout(req, res) {

    try {
      res.clearCookie('chatify').send('logged out');
      
      // console.log("looged out succesfully ");

    } catch (error) {

      res.status(404).send('error in logging out');
    }
  }
}

module.exports = Auth;