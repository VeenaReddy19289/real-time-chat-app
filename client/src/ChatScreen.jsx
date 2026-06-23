import {useEffect,useState,useRef} from "react";
import io from "socket.io-client";


const socket = io(
  import.meta.env.VITE_SERVER_URL
);


function ChatScreen({user}){


const [message,setMessage]=useState("");

const [messages,setMessages]=useState([]);

const [online,setOnline]=useState([]);

const bottomRef=useRef();



useEffect(()=>{
socket.on(
"old_messages",
(data)=>{

setMessages(data.map(msg=>({

author:msg.username,

message:msg.message,

time:msg.time


})));


});

socket.emit(
"join_room",
user
);



socket.on(
"receive_message",
(data)=>{

setMessages(prev=>[
...prev,
data
]);

}

);



socket.on(
"users",
(data)=>{

setOnline(data);

}

);



return()=>{

socket.off("receive_message");
socket.off("users");

}



},[]);






useEffect(()=>{


bottomRef.current?.scrollIntoView({

behavior:"smooth"

});


},[messages]);







const sendMessage=()=>{


if(!message.trim())
return;



const data={


room:user.room,

author:user.username,

message,

time:new Date()
.toLocaleTimeString()


};



socket.emit(
"send_message",
data
);



setMessage("");

};








return(

<div className="chat-layout">



<div className="sidebar">


<h2>
💬 ChatSphere
</h2>



<div className="user-box">

👤 {user.username}

</div>



<div className="room-box">

# {user.room}

</div>




<h3>

Online ({online.length})

</h3>



{

online.map((u,i)=>(

<p key={i}>

🟢 {u.username}

</p>


))

}



</div>





<div className="chat-area">



<div className="messages">


{

messages.map((msg,index)=>(


<div

key={index}

className={

msg.author===user.username

?

"message own"

:

"message"

}

>


<b>

{msg.author}

</b>


<p>

{msg.message}

</p>



<span>

{msg.time}

</span>



</div>



))

}



<div ref={bottomRef}></div>



</div>





<div className="input-box">



<input


value={message}


placeholder="Type message..."


onChange={(e)=>

setMessage(e.target.value)

}



onKeyDown={(e)=>{


if(e.key==="Enter")

sendMessage();


}}


/>



<button

onClick={sendMessage}

>

➤

</button>



</div>



</div>



</div>


)

}



export default ChatScreen;