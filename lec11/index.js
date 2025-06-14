//restful api
const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("stream/consumers");
const app = express();
const port = 8000;

//middleware -- we currently assume as plugin whose work is to send data to body
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
       
})

app.get('/users',(req,res)=>{
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
    });
    app.get("/api/users",(req,res)=>{
        return res.json(users);
    })
// routes
// marging all route
// app.route("/api/users/:id").get((req,res)=>{
// const id = Number(req.params.id);
// const user = user.find((user)=> user.id === id);
// return res.json(user);
// })
// .put((req,res)=>{
//     //edit user with id
//     res.json({status: "pending"});
// })
// .delete((req,res)=>{
// res.json({status: "panding"});
// });
// app.get('/api/users',(req,res)=>{
//     return res.json(users);
//})
app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id); //.params holds route parameters(value extracted from url path)
    const user = users.find((user)=> user.id === id);
    return res.json(user);
})
app.post('/api/users',(req,res)=>{
    const body= req.body;// jo bhe front se data bhejte hai isme strore hoga
    //console.log("body",body); // if we console.log it does not show it shows body undiefined becuz of middleware affter addding middleware the data we send from the postman cann visible in console window
   users.push({...body, id: users.length + 1});
   fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    return res.json({status: "success",id: users.length});
   });

});
app.patch("/api/users/:id",(req,res)=>{
    return res.json({status:"pending"});
});
app.delete("/api/users/:id",(req,res)=>{
    return res.json({status:"pending"});
})

app.listen(port,()=>console.log('server started'))
