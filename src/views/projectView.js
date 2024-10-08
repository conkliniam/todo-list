import {
  clearContent,
  clearCurrentNav,
  replaceOrAppendChild,
} from "./viewHelper";
import { getTodoDialog, openNewTodoDialog } from "./newTodoView";
import {
  addTodoItemToProject,
  editTodoItemInProject,
} from "../controllers/todoItemController";
import {
  displayTodoItem,
  getCompletionDialog,
  handleSetCompletionDate,
  updateTodoItem,
} from "./todoView";
import { getProjectById } from "../controllers/projectController";

const container = document.querySelector("#project-list");
const hashtag = document.querySelector(".hashtag");

function updateProjectSidebar(projects) {
  container.innerHTML = "";

  for (const project of projects) {
    addProjectToSidebar(project.id, project.color, project.name);
  }
}

function addProjectToSidebar(id, color, name) {
  const button = document.createElement("button");
  const hashCopy = hashtag.cloneNode(true);
  const hashSpan = document.createElement("span");
  const span = document.createElement("span");

  button.classList.add("nav-item");
  button.classList.add("sidebar-text");
  button.id = `project-${id}-button`;
  hashSpan.classList.add("hash-span");
  hashSpan.style.color = color;
  span.classList.add("text-span");
  span.textContent = name;

  hashSpan.appendChild(hashCopy);
  button.appendChild(hashSpan);
  button.appendChild(span);
  container.appendChild(button);

  button.addEventListener("click", () => {
    const project = getProjectById(id);
    loadProjectPage(project);
  });
}

function editProjectOnSideBar(project) {
  const button = document.querySelector(`#project-${project.id}-button`);
  const hashSpan = button.querySelector(".hash-span");
  const span = button.querySelector(".text-span");

  hashSpan.style.color = project.color;
  span.textContent = project.name;
}

function removeProjectFromSideBar(project) {
  const button = document.querySelector(`#project-${project.id}-button`);
  container.removeChild(button);
}

function loadProjectPage(project) {
  clearContent();
  clearCurrentNav();

  const projectButton = document.querySelector(`#project-${project.id}-button`);
  const content = document.querySelector("#content");
  projectButton.classList.toggle("current-nav");

  const title = document.createElement("h1");
  const addButton = document.createElement("button");
  const previousDialog = document.querySelector(".todo-dialog");
  const previousCompletionDialog = document.querySelector(
    "#completion-date-dialog"
  );
  const [dialog, form] = getTodoDialog(project);
  const [completionDialog, completionForm] = getCompletionDialog();

  replaceOrAppendChild(document.body, previousDialog, dialog);
  replaceOrAppendChild(
    document.body,
    previousCompletionDialog,
    completionDialog
  );

  title.className = "content-title";
  title.style.backgroundColor = project.color;
  title.style.color = project.textColor();
  title.textContent = `${project.name}`;

  addButton.classList.add("blue-button");
  addButton.classList.add("ml-25");
  addButton.id = "add-todo-button";
  addButton.textContent = "New To Do";
  addButton.addEventListener("click", () => {
    openNewTodoDialog();
  });

  const todoListItems = project.getTodoItems();
  const todoContainer = document.createElement("div");
  todoContainer.className = "to-do-container";

  for (const todoListItem of todoListItems) {
    displayTodoItem(todoContainer, project, todoListItem);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    dialog.open = false;
    handleAddTodoItem(event.target, project, todoContainer);
  });

  completionForm.addEventListener("submit", (event) => {
    const todoItemId = document.querySelector("#todo-item-id");
    const id = todoItemId.value;
    const todoContainer = document.querySelector(`#todo-container-${id}`);
    handleSetCompletionDate(event, id, project.id, todoContainer);
  });

  content.appendChild(title);
  content.appendChild(addButton);
  content.appendChild(todoContainer);
}

function loadAndCreateTodo(project) {
  loadProjectPage(project);

  const addTodoButton = document.querySelector("#add-todo-button");
  addTodoButton.click();
}

function handleAddTodoItem(form, project, todoContainer) {
  const parentProject = form.querySelector("#to-do-project");
  const todoId = form.querySelector("#edit-todo-id");
  const title = form.querySelector("#to-do-title");
  const description = form.querySelector("#to-do-description");
  const dueDate = form.querySelector("#to-do-due-date");
  const priority = form.querySelector("#to-do-priority");
  const notes = form.querySelector("#to-do-notes");
  const checklist = form.querySelectorAll('input[name="to-do-checklist"]');
  const checklistValues = [];

  for (const checklistItem of checklist) {
    if (checklistItem.value !== "") {
      checklistValues.push({ text: checklistItem.value, checked: false });
    }
  }

  const todoValues = {
    id: todoId.value,
    title: title.value,
    description: description.value,
    dueDate: dueDate.value,
    priority: priority.value,
    notes: notes.value,
    checklist: checklistValues,
  };

  if (todoId.value) {
    const [updatedProject, editedTodoItem] = editTodoItemInProject(
      todoValues,
      parentProject.value,
      project.id
    );

    if (project.id !== parentProject.value) {
      loadProjectPage(updatedProject);
    } else {
      updateTodoItem(todoContainer, editedTodoItem);
    }
  } else {
    const [updatedProject, newTodoItem] = addTodoItemToProject(
      todoValues,
      parentProject.value
    );

    if (project.id !== parentProject.value) {
      loadProjectPage(updatedProject);
    } else {
      displayTodoItem(todoContainer, project, newTodoItem);
    }
  }
}

export {
  updateProjectSidebar,
  addProjectToSidebar,
  editProjectOnSideBar,
  removeProjectFromSideBar,
  loadProjectPage,
  loadAndCreateTodo,
};
