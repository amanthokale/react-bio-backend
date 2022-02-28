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
  }],
  message:[{
    firstName:{
      type:String
    },
    lastName:{
      type:String
    },
    email:{
      type:String
    },
    message:{
      type:String
    }
  }],
  date:{
    type:Date,
    default:Date.now()
  }

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

userSchema.methods.addMessage=async function(firstName,lastName,email,message){
  try {

    this.message = this.message.concat({firstName,lastName,email,message})

    this.save();
    return this.message;
  } catch (e) {
    console.log(e)
  }
}


userSchema.methods.clearToken=async function(){
  try {
      this.tokens = [];
      this.save();
  } catch (e) {
    console.log(e)
  }
}



const User = mongoose.model("User",userSchema)

module.exports=User;
