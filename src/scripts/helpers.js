export { textSize, glowingCricle, message };

// !cut text after given size
const textSize = (text, size) => {
  const cutText = text.slice(0, size);
  return text.length > size ? cutText + "..." : cutText;
};
// ! Create glowing circle
const glowingCricle = (display, parentNode) => {
  if (display) {
    const glowingCircle = document.createElement("div");
    glowingCircle.classList.add("glowing-circle", "m2");
    glowingCircle.insertAdjacentHTML("beforeend", "<p>Searching</p>");
    parentNode.append(glowingCircle);
  }
  if (!display) {
    const glowingCricle = document.querySelector(".glowing-circle");
    glowingCricle.parentNode.removeChild(glowingCricle);
  }
};

// ! Display message
const message = (text, parentNode) => {
  const message = document.createElement("div");
  message.classList.add("message", "p2");
  parentNode.appendChild(message);
  message.innerText = text;
};
