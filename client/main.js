// const API_URL =process.env.API_URL || "http://localhost:3000/messages";
const API_URL = "https://visitor-guestbook-server-1aow.onrender.com";

async function showMessages(filter = "all") {
  const response = await fetch(`${API_URL}?filter=${filter}`);
  const messages = await response.json();

  const messageDiv = document.getElementById("message-count");
  messageDiv.textContent = `${messages.length} messages`;

  const messageList = document.getElementById("message-list");
  messageList.innerHTML = "";

  for (const message of messages) {
    const li = document.createElement("li");
    li.innerHTML = `${message.reaction} ${message.username} said: ${message.content} `;
    messageList.appendChild(li);
  }
}

showMessages();

const form = document.getElementById("theForm");
const filterForm = document.getElementById("filter-form");

form.addEventListener("submit", handleFormSubmit);
filterForm.addEventListener("submit", handleFilterFormSubmit);

async function handleFormSubmit(e) {
  e.preventDefault();
  const username = form.querySelector("input[name='username']");
  const messageTextarea = form.querySelector("textarea[name='content']");
  const reaction = form.querySelector("input[name='reaction']:checked");

  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      content: messageTextarea.value,
      reaction: reaction.value,
    }), // Include the selected radio button value in the request body
  });

  showMessages();
  // clear the input
  messageTextarea.value = "";
  username.value = "";
}

async function handleFilterFormSubmit(e) {
  e.preventDefault();
  const filterInput = filterForm.querySelector("select[name='filter']");
  const filter = filterInput.value;

  showMessages(filter);
}