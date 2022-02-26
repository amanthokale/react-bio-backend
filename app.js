const JWT_SECRET = process.env.JWT_SECRET;
require('dotenv').config();
const express = require('express');
const app = express();
require('./db/con');
const User = require('./db/userSchema');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');

const port = 5000
app.use(express.json())
app.use(cookieParser());


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
    httpOnly:true,
    secure:true
  })
  res.send("Login Successfull")
  }
  else{
    res.status(400).send("Invalid Credentals")
  }
  } catch (e) {
    res.status(400).send("login failed")
    console.log(e)
  }
})


app.post('/users',async(req,res)=>{
try {
  const {firstName,lastName,age,gender,email,mobile,password,confirmPassword,course}= req.body;
  if(confirmPassword === password){
  if(await User.findOne({email:email})){
    res.status(400).send("User Already Exists");
    return;
  }
  else{
  const hash = await bcrypt.hash(password,10);
  const a = await new User({firstName,lastName,age,gender,email,mobile,password:hash,course});
  const x = await a.save();
  console.log(x)
  // console.log(a)
  if(a){
  res.status(200).send(a);
}}}
else{
  res.status(400).send("Passwords not matching")
}
} catch (e) {
  console.log(`Failed to create user Error:/n${e}`)
  res.status(404).send("Failed to create user")
}
})

app.get('/Bio',auth,(req,res)=>{
  res.status(200).send(req.user)
})


app.listen(port,()=>{
  console.log(`Connected to port ${port}`)
})
