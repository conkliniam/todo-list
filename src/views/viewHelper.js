function clearContent() {
  const content = document.querySelector("#content");
  content.innerHTML = "";
}

function clearCurrentNav() {
  const currentNav = document.querySelector(".current-nav");

  if (currentNav) {
    currentNav.classList.toggle("current-nav");
  }
}

export { clearContent, clearCurrentNav };
