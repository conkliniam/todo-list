import { clearContent, clearCurrentNav } from "./viewHelper";

const container = document.querySelector("#project-list");
const hashtag = document.querySelector(".hashtag");

function updateProjectSidebar(projects) {
  container.innerHTML = "";

  for (const project of projects) {
    addProjectToSidebar(project);
  }
}

function addProjectToSidebar(project) {
  const button = document.createElement("button");
  const hashCopy = hashtag.cloneNode(true);
  const hashSpan = document.createElement("span");
  const span = document.createElement("span");

  button.classList.add("nav-item");
  button.classList.add("sidebar-text");
  button.id = `${project.id}-button`;
  hashSpan.style.color = project.color;
  span.textContent = project.name;

  hashSpan.appendChild(hashCopy);
  button.appendChild(hashSpan);
  button.appendChild(span);
  container.appendChild(button);

  button.addEventListener("click", () => loadProjectPage(project));
}

function loadProjectPage(project) {
  clearContent();
  clearCurrentNav();

  const projectButton = document.querySelector(`#${project.id}-button`);
  const content = document.querySelector("#content");
  projectButton.classList.toggle("current-nav");

  const title = document.createElement("h1");
  title.className = "content-title";
  title.style.backgroundColor = project.color;
  title.textContent = `${project.name}`;

  content.appendChild(title);
}

export { updateProjectSidebar, addProjectToSidebar, loadProjectPage };
