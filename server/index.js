const express = require("express");
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");
const mongoose = require("mongoose");

const Message = require("./models/Message");


const app = express();

app.use(cors());


app.get("/",(req,res)=>{
res.send("Server running");
});



mongoose.connect(

  "mongodb://127.0.0.1:27017/chatapp"
)
.then(()=>{

console.log("MongoDB connected");


server.listen(3001,()=>{

console.log(
"Server running on port 3001"
);

});


})
.catch(err=>{

console.log(
"Mongo error:",
err
);

});



const server = http.createServer(app);



const io = new Server(server,{

cors:{
origin:"*",
methods:["GET","POST"]
}

});



let users=[];



io.on("connection",(socket)=>{


console.log(
"Connected:",
socket.id
);



socket.on("join_room",async(data)=>{


socket.join(data.room);



users.push({

id:socket.id,

username:data.username,

room:data.room

});



const oldMessages =
await Message.find({
room:data.room
});



socket.emit(
"old_messages",
oldMessages
);



io.to(data.room)
.emit(
"users",
users.filter(
u=>u.room===data.room
)
);



});





socket.on(
"send_message",
async(data)=>{


await Message.create({

username:data.author,

room:data.room,

message:data.message,

time:data.time

});



io.to(data.room)
.emit(
"receive_message",
data
);


});






socket.on(
"disconnect",
()=>{


users =
users.filter(
u=>u.id!==socket.id
);


});



});