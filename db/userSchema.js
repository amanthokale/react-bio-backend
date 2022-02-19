const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  firstName:{
    type:String
  },
  lastName:{
    type:String
  },
  age:{
    type:Number
  },
  gender:{
    type:String
  },
  email:{
    type:String,
  },
  mobile:{
    type:Number
  },
  password:{
    type:String
  },
  course:{
    type:String
  },
  tokens:[{
      token:{
        type:String,
        required:true
      }
  }]

})


userSchema.methods.generateAuth=async function(){
    try {
      const token = jwt.sign({_id:this._id},process.env.JWT_SECRET)
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token
    } catch (e) {
      console.log(e)
    }
}

const User = mongoose.model("User",userSchema)

module.exports=User;
