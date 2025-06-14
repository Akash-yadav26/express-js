//restful api
const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("stream/consumers");
const app = express();
const port = 8000;

//middleware -- 
// app.use(express.urlencoded({extended:false}));
// app.use((req,res,next)=>{
//       console.log("hello middlewire 1");
//       return res.json({mgs: "hello from middleware 1"});
       
// }); // in this   first middle wire  callto anthore middlewire  then without ussing next function this will not forward the progem to other task 

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
app.get('/users',(req,res)=>{
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
    });
    //header in second line shows you can change in headers
    app.get("/api/users",(req,res)=>{
        res.setHeader("x-myName","akash yadav");
        //always add x in font of custom headder
        return res.json(users);
    })



app.get("/api/users/:id",(req,res)=>{
    //console.log("i in get route",req.myUserName)
    const id = Number(req.params.id); //.params holds route parameters(value extracted from url path)
    const user = users.find((user)=> user.id === id);
    if(!users) return res.status(404).json({error : 'user not found'});
    return res.json(user);
})
app.post('/api/users',(req,res)=>{
    const body= req.body;// jo bhe front se data bhejte hai isme strore hoga
    //console.log("body",body); // if we console.log it does not show it shows body undiefined becuz of middleware affter addding middleware the data we send from the postman cann visible in console window
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({msg : "All fields are req..."});
    }
   users.push({...body, id: users.length + 1});
   fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    return res.status(201).json({status: "success",id: users.length});
   }); // .status(201)  to set status according to repsonse

});
app.patch("/api/users/:id",(req,res)=>{
    return res.json({status:"pending"});
});
app.delete("/api/users/:id",(req,res)=>{
    return res.json({status:"pending"});
})

app.listen(port,()=>console.log('server started'))
