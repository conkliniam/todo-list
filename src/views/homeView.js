import {
  clearContent,
  clearCurrentNav,
  replaceOrAppendChild,
} from "./viewHelper";
import { getTodoItemList } from "./todoListView";
import {
  loadProjectPage,
  addProjectToSidebar,
  editProjectOnSideBar,
  removeProjectFromSideBar,
} from "./projectView";
import { getProjectDialog, openProjectDialog } from "./newProjectView";
import {
  addProject,
  editProject,
  removeProject,
} from "../controllers/projectController";
import chevronDown from "../images/chevron-down.svg";
import chevronUp from "../images/chevron-up.svg";
import pencilSquare from "../images/pencil-square.svg";
import trashFill from "../images/trash-fill.svg";

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
  const projectContainer = document.createElement("div");

  title.className = "content-title";
  title.textContent = "To Do List Projects";
  projectContainer.classList.add("home-project-container");
  addButton.classList.add("blue-button");
  addButton.classList.add("ml-25");
  addButton.textContent = "New Project";

  content.appendChild(title);
  content.appendChild(addButton);
  content.appendChild(projectContainer);

  for (const project of projects) {
    addProjectToHomePage(project, projectContainer);
  }

  addButton.addEventListener("click", () => {
    openProjectDialog();
  });
  form.addEventListener("submit", () => {
    const id = form.querySelector("#project-id");
    const name = form.querySelector("#project-name");
    const color = form.querySelector("#project-color");

    if (id.value) {
      const project = editProject(id.value, name.value, color.value);
      editProjectOnSideBar(project);
      editProjectOnHomepage(project, projectContainer);
    } else {
      const newProject = addProject(name.value, color.value);
      addProjectToSidebar(newProject.id, newProject.color, newProject.name);
      addProjectToHomePage(newProject, projectContainer);
    }
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
  const editIcon = document.createElement("img");
  const editButton = document.createElement("button");
  const trashIcon = document.createElement("img");
  const deleteButton = document.createElement("button");

  container.id = `home-project-${project.id}`;
  container.className = "home-project";
  container.style.backgroundColor = project.color;
  nameButton.style.color = project.textColor();
  header.className = "home-header";
  nameButton.className = "name-button";
  nameButton.textContent = project.name;
  expandButton.className = "blue-button";
  expand.src = chevronDown;
  collapse.src = chevronUp;
  collapse.classList.toggle("display-none");
  todoItemContainer.classList.toggle("display-none");

  editIcon.src = pencilSquare;
  trashIcon.src = trashFill;

  expandButton.appendChild(expand);
  expandButton.appendChild(collapse);
  editButton.appendChild(editIcon);
  deleteButton.appendChild(trashIcon);
  editButton.classList.add("blue-button");
  deleteButton.classList.add("red-button");

  expandButton.addEventListener("click", () => {
    expand.classList.toggle("display-none");
    collapse.classList.toggle("display-none");
    todoItemContainer.classList.toggle("display-none");
  });

  editButton.addEventListener("click", () => {
    openProjectDialog(project);
  });

  nameButton.addEventListener("click", () => loadProjectPage(project));

  header.appendChild(expandButton);
  header.appendChild(nameButton);
  header.appendChild(editButton);
  header.appendChild(deleteButton);
  container.appendChild(header);
  container.appendChild(todoItemContainer);
  content.appendChild(container);

  deleteButton.addEventListener("click", () => {
    removeProject(project);
    removeProjectFromSideBar(project);
    content.removeChild(container);
  });
}

function editProjectOnHomepage(project, content) {
  const container = content.querySelector(`#home-project-${project.id}`);
  const nameButton = container.querySelector(".name-button");
  container.style.backgroundColor = project.color;
  nameButton.style.color = project.textColor();
  nameButton.textContent = project.name;
}

export { loadHomePage };
