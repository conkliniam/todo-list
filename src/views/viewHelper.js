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

function capitalize(word) {
  if (word.length > 0) {
    return word[0].toUpperCase() + word.slice(1);
  }

  return word;
}

function replaceOrAppendChild(parent, oldChild, newChild) {
  if (oldChild) {
    parent.replaceChild(newChild, oldChild);
  } else {
    parent.appendChild(newChild);
  }
}

export { clearContent, clearCurrentNav, capitalize, replaceOrAppendChild };
