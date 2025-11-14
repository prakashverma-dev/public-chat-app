
const express = require("express")
const http = require("http")
const path = require("path")
const {Server} = require("socket.io")

const app = express()
const server = http.createServer(app)


app.use(express.static("public")) // Serv frontend files

// app.get("/", (req, res)=>{

//     res.sendFile(path.resolve("./public/index.html"))
// }) 


/* # Integrating Socket.IO : Socket.IO is composed of two parts:

a) A server that integrates with (or mounts on) the Node.JS HTTP Server (the socket.io package)
b) A client library that loads on the browser side (the socket.io-client package) 
<script src="/socket.io/socket.io.js"></script>

*/


const io = new Server(server)

let users = []; // store all connected users

// Socket.io We will handle here -
io.on("connection", (socket)=>{

    //to log user which new user connected -
    socket.on("new-username", (username)=>{

      if (!username) return

      socket.username = username; //saving username to socket

      
        // Avoid duplicates (if same name joins again)
      if (!users.includes(username)){
        users.push(username); 
      } 

        console.log(`a new user ${username} connected, userId : ${socket.id}`)
        

     
        socket.broadcast.emit("system", `${username} joined the chat`); 

        io.emit("update-users", users); // send updated list to everyone

    })
    
    //When a new user sends a message, we receiving and then sending it back to all io -
    socket.on('chat message', (msg)=>{


      if (!socket.username) {
        console.log("Message from unknown user ignored.");
        return;
      }
   
        // console.log("His message : ", msg)
        io.emit("all-message", `${socket.username}: ${msg}`) // if any user sends any message from socket instant or creted WS server send it back to all io event with 'all-message' user-defined event name to client side.

    })

    //Each socket also fires a special disconnect event -
  // When a user disconnects -
    socket.on('disconnect', () => {
      
          if (!socket.username) return; // avoid undefined user events

          if (socket.username) {

            users = users.filter((user) => user !== socket.username);
            io.emit("system", `${socket.username} left the chat`);
            io.emit("update-users", users);
        }

 }) 


})

 
//  Note : Notice that I initialize a new instance of socket.io by passing the server (the HTTP server) object. Then I listen on the connection event for incoming sockets and log it to the console.


const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
