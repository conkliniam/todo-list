import { clearContent, clearCurrentNav } from "./viewHelper";
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
  const [dialog, nameInput, colorInput, submitButton] = getProjectDialog();
  homeButton.classList.toggle("current-nav");

  const title = document.createElement("h1");
  const addButton = document.createElement("button");

  title.className = "content-title";
  title.textContent = "To Do List Projects";
  addButton.className = "blue-button";
  addButton.textContent = "New Project";

  content.appendChild(title);
  content.appendChild(addButton);

  for (const project of projects) {
    addProjectToHomePage(project, content);
  }

  addButton.addEventListener("click", () => {
    dialog.open = true;
  });
  submitButton.addEventListener("click", () => {
    const newProject = addProject(nameInput.value, colorInput.value);
    addProjectToSidebar(newProject);
    addProjectToHomePage(newProject, content);
  });
  content.appendChild(dialog);
}

function addProjectToHomePage(project, content) {
  const container = document.createElement("div");
  const header = document.createElement("div");
  const nameButton = document.createElement("button");
  const expand = document.createElement("img");
  const collapse = document.createElement("img");
  const todoItemContainer = getTodoItemList(project.getTodoItems());
  const expandButton = document.createElement("button");

  container.className = "home-project";
  container.style.backgroundColor = project.color;
  header.className = "home-header";
  nameButton.className = "name-button";
  expandButton.className = "blue-button";
  nameButton.textContent = project.name;
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

  header.appendChild(nameButton);
  header.appendChild(expandButton);
  container.appendChild(header);
  container.appendChild(todoItemContainer);
  content.appendChild(container);
}

export { loadHomePage };
