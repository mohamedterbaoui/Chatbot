// Get send button and textbox
const sendBtn = document.querySelector("#sendBtn");
const textbox = document.querySelector("#textbox");

// Get chat container
const chatContainer = document.querySelector("#chatContainer");

// Send message when "Send" button is clicked
sendBtn.addEventListener("click", function (e) {
  let userMessage = textbox.value.trim();

  if (userMessage === "") {
    alert("Please type in a message");
  } else {
    textbox.value = ""; // Clear the input field
    sendMessage(userMessage); // Send user message
    chatbotResponse(userMessage); // Get bot response
  }
});

// Function to display user's message
function sendMessage(userMessage) {
  const newMessage = document.createElement("div");
  newMessage.textContent = userMessage;
  newMessage.classList.add("message", "text-end");
  chatContainer.appendChild(newMessage);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}

// Function to display bot's response
function chatbotResponse(userMessage) {
  const maxTokens = document.querySelector("#maxTokens").value;
  const temperature = document.querySelector("#temperature").value;

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage, maxTokens, temperature }),
  })
    .then((response) => response.json())
    .then((data) => {
      const botMessage = document.createElement("div");
      botMessage.textContent = data.reply;
      botMessage.classList.add("bot-message", "text-start");
      chatContainer.appendChild(botMessage);
      chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
    })
    .catch((error) => console.error("Error", error));
}

// Update displayed values when sliders move
document.querySelector("#maxTokens").addEventListener("input", function () {
  document.querySelector("#maxTokensValue").textContent = this.value;
});

document.querySelector("#temperature").addEventListener("input", function () {
  document.querySelector("#temperatureValue").textContent = this.value;
});

// Allow user to send message by pressing "Enter"
textbox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});
