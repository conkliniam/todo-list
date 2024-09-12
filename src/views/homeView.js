import {
  clearContent,
  clearCurrentNav,
  replaceOrAppendChild,
} from "./viewHelper";
import { getTodoItemList } from "./todoListView";
import { loadProjectPage } from "./projectView";
import { getProjectDialog } from "./newProjectView";
import { addProject } from "../controllers/projectController";
import { addProjectToSidebar } from "./projectView";
import chevronDown from "../images/chevron-down.svg";
import chevronUp from "../images/chevron-up.svg";

function loadHomePage(projects) {
  clearContent();
  clearCurrentNav();
  const homeButton = document.querySelector("#home-button");
  const content = document.querySelector("#content");
  const oldDialog = document.querySelector(".project-dialog");
  const [dialog, form] = getProjectDialog();

  replaceOrAppendChild(document.body, oldDialog, dialog);

  homeButton.classList.toggle("current-nav");

  const title = document.createElement("h1");
  const addButton = document.createElement("button");

  title.className = "content-title";
  title.textContent = "To Do List Projects";
  addButton.classList.add("blue-button");
  addButton.classList.add("ml-25");
  addButton.textContent = "New Project";

  content.appendChild(title);
  content.appendChild(addButton);

  for (const project of projects) {
    addProjectToHomePage(project, content);
  }

  addButton.addEventListener("click", () => {
    dialog.open = true;
  });
  form.addEventListener("submit", () => {
    const name = form.querySelector("#project-name");
    const color = form.querySelector("#project-color");
    const newProject = addProject(name.value, color.value);
    name.value = "";
    color.value = "#000000";
    addProjectToSidebar(newProject);
    addProjectToHomePage(newProject, content);
  });
}

function addProjectToHomePage(project, content) {
  const container = document.createElement("div");
  const header = document.createElement("div");
  const nameButton = document.createElement("button");
  const expand = document.createElement("img");
  const collapse = document.createElement("img");
  const todoItemContainer = getTodoItemList(project);
  const expandButton = document.createElement("button");

  container.className = "home-project";
  container.style.backgroundColor = project.color;
  header.className = "home-header";
  nameButton.className = "name-button";
  nameButton.textContent = project.name;
  expandButton.className = "blue-button";
  expand.src = chevronDown;
  collapse.src = chevronUp;
  collapse.classList.toggle("display-none");
  todoItemContainer.classList.toggle("display-none");

  expandButton.appendChild(expand);
  expandButton.appendChild(collapse);

  expandButton.addEventListener("click", () => {
    expand.classList.toggle("display-none");
    collapse.classList.toggle("display-none");
    todoItemContainer.classList.toggle("display-none");
  });

  nameButton.addEventListener("click", () => loadProjectPage(project));

  header.appendChild(expandButton);
  header.appendChild(nameButton);
  container.appendChild(header);
  container.appendChild(todoItemContainer);
  content.appendChild(container);
}

export { loadHomePage };
