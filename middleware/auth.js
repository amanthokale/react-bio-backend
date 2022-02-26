const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../db/userSchema');
// const alert = require('alert');





const auth = async(req,res,next)=>{
  try {
    const token = req.cookies.jwt;
    console.log(token)
    const verify =await
    jwt.verify(token,process.env.JWT_SECRET);
    console.log(verify)
    const user = await User.findOne({_id:verify._id,"tokens:token":token});
      // console.log(user)
if(!user){
  throw new Error('User Not Found')
}
// USED IN LOGOUT
      req.token = token;
      req.user = user;

    next();
  } catch (e) {
    console.log("CANNOT AUTHORIZE YOU")
    console.log(e)
    res.status(401).send("Unauthorised")

  }

}


module.exports = auth;
