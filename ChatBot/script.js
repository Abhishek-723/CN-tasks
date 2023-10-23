// Write the requirred javascript here
const chatbot = document.getElementById("chatbot");
const chatList = document.getElementById("chatList");

const apiKey = "API_KEY";
const endpoint = "https://api.openai.com/v1/chat/completions";

function toggleIcons() {
  const messageIcon = document.querySelector(".fa-message");
  const xmarkIcon = document.querySelector(".fa-xmark");

  if (messageIcon.style.display === "none") {
    messageIcon.style.display = "inline-block";
    xmarkIcon.style.display = "none";
    chatbot.style.display = "none";
  } else {
    messageIcon.style.display = "none";
    xmarkIcon.style.display = "inline-block";
    chatbot.style.display = "inline-block";
  }
}

function addThinkingMessage() {
  const newLi = document.createElement("li");
  newLi.classList = "chat incoming";
  const span = document.createElement("span");
  span.classList = "material-symbols-outlined";
  span.textContent = "N";
  newLi.appendChild(span);
  const newP = document.createElement("p");
  newP.textContent = "Thinking...";
  newLi.appendChild(newP);
  chatList.appendChild(newLi);
}

function addBotMessage(botMessage) {
  const child = chatList.lastChild;
  child.childNodes[1].innerText = botMessage;
}

function sendMessage() {
  const messageTextarea = document.getElementById("messageTextarea");
  const message = messageTextarea.value;
  if (message === "") return;
  const newLi = document.createElement("li");
  newLi.className = "chat outgoing";

  const newP = document.createElement("p");
  newP.textContent = message;

  newLi.appendChild(newP);
  chatList.appendChild(newLi);
  addThinkingMessage();

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: message }],
      max_tokens: 50, // Adjust the number of tokens as needed
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const botMessage = data.choices[0].message.content;
      console.log(botMessage);
      addBotMessage("New message");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  messageTextarea.value = "";
}
