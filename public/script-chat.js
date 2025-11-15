
const socket = io(); // A new socket instant server created at Client side
const username = localStorage.getItem("chat_username");

// Redirect if no username
if (!username) {
window.location.href = "index.html";
}

// Logout button
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("chat_username");  // clear username
  window.location.href = "index.html";       // send back to login page
});


// Map to store username-color pairs
const userColors = {};

function getRandomColor() {
  const colors = [
    "#4e8cff",
    "#f54291",
    "#42f5aa",
    "#ff9f43",
    "#9b59b6",
    "#16a085",
    "#f39c12",
    "#e74c3c",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Assign consistent color per username
function getUserColor(name) {
  if (!userColors[name]) {
    userColors[name] = getRandomColor();
  }
  return userColors[name];
}



// Send user info on connect or reconnect
socket.on("connect", ()=>{
    
    // Send new entered user name to server -
    socket.emit("new-username", username);

     // If not first time connection
    if (socket.reconnected) {
        appendMessage("You rejoined the chat", "system");
    } else {
        socket.reconnected = true; // mark reconnection flag
    }
})


const messageInput = document.getElementById('message');
const sendBtn  = document.getElementById('send-btn');
const chatBox = document.getElementById("chat-box");
const usersList = document.getElementById("users-list");



sendBtn.addEventListener("click", ()=>{
    // console.log(messageInput.value)

    if (messageInput.value) {

    socket.emit('chat message', messageInput.value.trim());
    // appendMessage(`You: ${messageInput.value}`, "self");
    messageInput.value = "";

    }

})

messageInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    if (messageInput.value) {

      socket.emit('chat message', messageInput.value.trim());
      // appendMessage(`You: ${messageInput.value}`, "self");
      messageInput.value = "";
  
      }
    

  }
})

// Show welcome message for yourself
appendMessage(`You joined as ${username}`, "system");

socket.on("all-message", (data)=>{
    // console.log(data)
    appendMessage(data, "other");

})

// Receive system event name messages -
socket.on("system", (data) => {
    appendMessage(data, "system");
  });

// Handle user list updates
socket.on("update-users", (users) => {

    usersList.innerHTML = ""; 
    
    // Update online users count
  const onlineCount = document.getElementById("online-count");
  onlineCount.textContent = users.length;

    users.forEach((u) => {
      const li = document.createElement("li");
      li.textContent = u + (u === username ? " (You)" : "");
      li.style.color = getUserColor(u);
      usersList.appendChild(li);
    });
  });


function appendMessage(message, type = "other") {

    const div = document.createElement("div");
    div.classList.add("message", type);
  
   // Check if it's a chat message with "name: text"
  if (type === "other" && message.includes(":")) {
    const [name, ...msgParts] = message.split(":");
    const msgText = msgParts.join(":").trim();

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("username");
    nameSpan.textContent = name + ": ";
    nameSpan.style.color = getUserColor(name);

    const textSpan = document.createElement("span");
    textSpan.textContent = msgText;

    div.appendChild(nameSpan);
    div.appendChild(textSpan);
  } else {
    div.textContent = message;
  }

  const time = document.createElement("span");
  time.classList.add("time");
  time.textContent = formatTime();

  div.appendChild(time);
  chatBox.appendChild(div);

  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: "smooth",
  });
  }


// Format timestamp
function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } 


// To show reconnecting notice -
  socket.io.on("reconnect_attempt", () => {
    appendMessage("Reconnecting...", "system");
  });
  // socket.io.on("reconnect", () => {
  //   appendMessage("Connection restored", "system");
  // });
  socket.io.on("disconnect", () => {
    appendMessage("You are disconnected. Trying to reconnect...", "system");
  });