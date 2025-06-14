const express = require("express");
const{logReqRes} = require('./middlewares');
const {connectMongoDb, getUserById} = require('./connection')
const userRouter = require("./routes/user");
const app = express();
const port = 8000;
//connection
connectMongoDb('./mongodb://127.0.0.1:27017/youtube-app-1');


app.use(express.urlencoded({extended:false})); 
app.use(logReqRes("log.txt"));
app.use("/api/user",userRouter);


app.listen(port,()=>console.log('server started'))
