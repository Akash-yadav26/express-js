const express = require("express");
/* const users = require("./MOCK_DATA.json");*/
const fs = require("fs");
const mongoose = require("mongoose");
const { json } = require("stream/consumers");
const app = express();
const port = 8000;
//connecting mongoose
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error",err));
//schema
const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,

    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
        required: true,
        unique: true, // before inster check if same entry already exist or not

    },
    jobTitle:{
     type: String,
    },
    gender:{
        type: String,
    },
},
{timestamps:true}
);
const User = mongoose.model('user',userschema);
app.use(express.urlencoded({extended:false})); // work --> jo front se value arahi hoti hai unko object me convert karta hai then first put values in req.body then then give to us
app.use((req,res,next)=>{

      console.log("hello middlewire 1");
     // req.myUserName = "akaahyadav.dev"; // this we use to check that when any chages done in previous it remians changes next middlewire also
     fs.appendFile("log.txt",`\n ${Date.now()}:${req.ip}${req.method}:${req.path}`,(err,data)=>{
        next()
     })
    //  next(); // so this way we get data also             
}); 
app.use((req,res,next)=>{
console.log("hello from middlewire 2");
next();
});
app.get('/users',async(req,res)=>{
const allDbUsers = await User.find({})
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>
    `;
    res.send(html);
    });
    //header in second line shows you can change in headers
    app.get("/api/users",async(req,res)=>{
     const allDbUsers = await User.find({});
        res.setHeader("x-myName","akash yadav");
        //always add x in font of custom headder
        return res.json(allDbUsers);
    })



app.get("/api/users/:id",async(req,res)=>{

    //console.log("i in get route",req.myUserName)
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error : 'user not found'});
    return res.json(user);
})
app.post('/api/users',async (req,res)=>{
    const body= req.body;// jo bhe front se data bhejte hai isme strore hoga
    //console.log("body",body); // if we console.log it does not show it shows body undiefined becuz of middleware affter addding middleware the data we send from the postman cann visible in console window
    if(!body || 
        !body.first_name ||
        !body.last_name || 
        !body.email ||
        !body.gender ||
         !body.job_title){
        return res.status(400).json({msg : "All fields are req..."});
    }
     const result = await User.create({
      firstName: body.first_name,
      last_name: body.last_name,
      email: body.email ,
      gender: body.gender,
      jobTitle: body.job_title,
    });
    return  res.status(201).json({msg: "success"}); 
});
app.patch("/api/users/:id",async(req,res)=>{
 await User.findByIdAndUpdate(req.params.id,{lastName: "changed"});
    return res.json({status:"success"});
});
app.delete("/api/users/:id",async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:"success"});
})

app.listen(port,()=>console.log('server started'))
