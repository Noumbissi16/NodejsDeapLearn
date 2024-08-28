const messages = document.getElementById("messages");
const input = document.getElementById("input");
new window.EventSource("/sse").onmessage = function (event) {
  messages.innerHTML += `<p>${event.data}</p>`;
};

window.form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  window.fetch(`/chat?message=${input.value}`);
  input.value = "";
});
