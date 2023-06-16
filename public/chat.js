const socket = io("http://localhost:3000");

const sender = document.querySelector("#sender");
const message = document.querySelector("#message");
const submitBtn = document.querySelector("#submitBtn");
const output = document.querySelector("#output");
const feedback = document.querySelector("#feedback");

submitBtn.addEventListener("click", () => {
  socket.emit("chat", {
    sender: sender.value,
    message: message.value,
  });
});

socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.sender}: </strong>${data.message}</p>`;
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", sender.value);
});

socket.on("typing", (data) => {
  feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
});
