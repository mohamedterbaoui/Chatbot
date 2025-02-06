// get send button 
const sendBtn = document.querySelector('#sendBtn');

// get textbox
const textbox = document.querySelector('#textbox');

// Create a user object
let user = {message : ""};

// Chat container
const chatContainer = document.querySelector('#chatContainer');

sendBtn.addEventListener('click', function(e) {

    let userMessage = textbox.value;
    if(userMessage == ""){
        alert("Please type in a message");
    }else {
        let trimmedUserMessage = userMessage.trim();
        user.message = trimmedUserMessage;

        textbox.value = "";

        sendMessage(user.message);

        chatbotResponse(user.message);
    }
});

function sendMessage(userMessage) {

    const newMessage = document.createElement("h4");
    newMessage.textContent = userMessage;
    newMessage.classList.add("message");
    chatContainer.appendChild(newMessage);
    
}

function chatbotResponse(userMessage) {
    const botMessage = document.createElement("h4");

    botMessage.textContent = userMessage;
    botMessage.classList.add("bot-message");

    chatContainer.appendChild(botMessage);
}