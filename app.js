require('dotenv').config();
const express = require('express');
const app = express();
require('./db/con');
const User = require('./db/userSchema');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth')
const JWT_SECRET = process.env.JWT_SECRET;


const port = 3000
app.use(express.json())


app.post('/login',async(req,res)=>{
  try {
    const pass = await User.findOne({email:req.body.email})
    const verify = await bcrypt.compare(req.body.password,pass.password)
    console.log(pass)
    console.log(verify)
  if(pass && verify){
  const token = await pass.generateAuth();
  console.log(token)
  res.cookie('jwt',token,{
    httpOnly:true
  })
  res.send("Login Sucessfull")
  }
  else{
    res.json({error:"Invalid Credentals"})
  }
  } catch (e) {
    res.send("login failed")
    console.log(e)
  }
})


app.post('/users',async(req,res)=>{
try {
  const {firstName,lastName,age,gender,email,mobile,password,confirmPassword,course}= req.body;
  if(confirmPassword === password){
  if(await User.findOne({email:email})){
    res.send("User Already Exists");
  }
  else{
  const hash = await bcrypt.hash(password,10)
  const a = await new User({firstName,lastName,age,gender,email,mobile,password:hash,course});
  const x = await a.save();
  console.log(x)
  // console.log(a)
  if(a){
  res.send("Data Inserted Successfully")
}}}
else{
  res.send("Passwords not matching")
}
} catch (e) {
  console.log(`Failed to create user Error:/n${e}`)
  res.send("Failed to create user")
}
})



app.listen(port,()=>{
  console.log(`Connected to port ${port}`)
})
