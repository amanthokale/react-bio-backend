const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../db/schema');
const alert = require('alert');





const auth = async(req,res,next)=>{
  try {
    const token = req.cookies.jwt;
    const verify =await jwt.verify(token,process.env.JWT_SECRET);
console.log(verify.id)
    const user = await User.findOne({_id:verify.id});
      // console.log(user)

// USED IN LOGOUT
      req.token = token;
      req.user = user;

    next();
  } catch (e) {
    console.log("CANNOT AUTHORIZE YOU")
    res.send(e)

  }

}


module.exports = auth;
