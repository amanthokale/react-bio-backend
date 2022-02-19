const mongoose = require('mongoose');


// console.log(process.env.DB_CONNECT)
mongoose.connect(process.env.DB).then(()=>{
  console.log("Connected to DB")
}).catch((e)=>{
  console.log("Failed to connect DB")
})
