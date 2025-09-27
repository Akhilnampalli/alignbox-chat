const apiUrl = "http://localhost:5000/api/messages";

async function fetchMessages() {
    const res = await fetch(apiUrl);
    const messages = await res.json();

    const chatArea = document.getElementById("chat-area");
    chatArea.innerHTML = "";

    const username = document.getElementById("username").value || "someone";

    messages.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message " + (msg.username === username ? "self" : "other");
        div.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
        chatArea.appendChild(div);
    });

    chatArea.scrollTop = chatArea.scrollHeight;
}

async function sendMessage() {
    const username = document.getElementById("username").value || "someone";
    const text = document.getElementById("message").value.trim();

    if (!text) return;

    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username,
            text,
            timestamp: new Date().toISOString()
        })
    });

    document.getElementById("message").value = "";
    fetchMessages();
}

setInterval(fetchMessages, 2000);
window.onload = fetchMessages;
