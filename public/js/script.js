// get send button 
const sendBtn = document.querySelector('#sendBtn');

// get textbox
const textbox = document.querySelector('#textbox');

// Create a user object
let user = {message : ""};

// Chat container
const chatContainer = document.querySelector('#chatContainer');

textbox.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        sendBtn.click();
    }
})

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

    fetch('/chat', {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement("h4");
        botMessage.textContent = data.reply;
        botMessage.classList.add("bot-message");
        chatContainer.appendChild(botMessage);
    })
    .catch(error => console.error('Error', error));


}