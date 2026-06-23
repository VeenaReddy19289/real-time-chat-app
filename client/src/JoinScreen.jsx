import {useState} from "react";


function JoinScreen({setUser}){


const [username,setUsername]=useState("");

const [room,setRoom]=useState("");



const joinRoom=()=>{


if(username && room)

setUser({

username,
room

});


};



return(

<div className="join-container">


<div className="join-box">


<h1>
ChatSphere
</h1>



<input

placeholder="Username"

onChange={(e)=>

setUsername(e.target.value)

}

/>



<input

placeholder="Room"

onChange={(e)=>

setRoom(e.target.value)

}

/>




<button onClick={joinRoom}>

Join Chat

</button>



</div>


</div>


)


}



export default JoinScreen;