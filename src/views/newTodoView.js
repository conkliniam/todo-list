import * as priority from "../models/priority";
import { capitalize } from "./viewHelper";
import { getSavedProjects } from "../controllers/projectController";

function getTodoDialog(parentProject) {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");
  const todoIdInput = document.createElement("input");
  const formTitle = document.createElement("h2");
  const projects = getSavedProjects();
  const projectsLabel = document.createElement("label");
  const projectsSelect = document.createElement("select");
  const projectsDiv = document.createElement("div");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const titleDiv = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  const descriptionTextArea = document.createElement("textarea");
  const descriptionDiv = document.createElement("div");
  const dueDateLabel = document.createElement("label");
  const dueDateInput = document.createElement("input");
  const dueDateDiv = document.createElement("div");
  const priorityLabel = document.createElement("label");
  const prioritySelect = document.createElement("select");
  const priorityDiv = document.createElement("div");
  const notesLabel = document.createElement("label");
  const notesTextArea = document.createElement("textArea");
  const notesDiv = document.createElement("div");
  const checklistLabel = document.createElement("label");
  const checklistButton = document.createElement("button");
  const checklistInput = document.createElement("input");
  const checklistDiv1 = document.createElement("div");
  const checklistDiv2 = document.createElement("div");
  const cancelButton = document.createElement("button");
  const submitButton = document.createElement("button");
  const buttonDiv = document.createElement("div");

  dialog.classList.add("todo-dialog");
  form.method = "dialog";

  todoIdInput.id = "edit-todo-id";
  todoIdInput.type = "hidden";
  todoIdInput.value = null;

  formTitle.textContent = "New To Do Item";
  formTitle.id = "new-todo-title";

  projectsSelect.id = "to-do-project";
  projectsSelect.name = "to-do-project";

  projectsLabel.for = "to-do-project";
  projectsLabel.textContent = "Containing Project:";

  for (const project of projects) {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.name;

    if (parentProject.id === project.id) {
      option.selected = true;
    }

    projectsSelect.appendChild(option);
  }

  titleInput.id = "to-do-title";
  titleInput.name = "to-do-title";
  titleInput.type = "text";
  titleInput.required = true;
  titleInput.maxLength = 30;

  titleLabel.for = "to-do-title";
  titleLabel.textContent = "Title:";

  descriptionTextArea.id = "to-do-description";
  descriptionTextArea.name = "to-do-description";
  descriptionTextArea.maxLength = 128;

  descriptionLabel.for = "to-do-description";
  descriptionLabel.textContent = "Description:";

  dueDateInput.id = "to-do-due-date";
  dueDateInput.name = "to-do-due-date";
  dueDateInput.type = "datetime-local";
  dueDateInput.required = true;

  dueDateLabel.for = "to-do-due-date";
  dueDateLabel.textContent = "Due Date:";

  prioritySelect.id = "to-do-priority";
  prioritySelect.name = "to-do-priority";

  priorityLabel.for = "to-do-priority";
  priorityLabel.textContent = "Priority:";

  const highOption = document.createElement("option");
  const mediumOption = document.createElement("option");
  const lowOption = document.createElement("option");

  highOption.value = priority.HIGH;
  highOption.textContent = capitalize(priority.HIGH);
  mediumOption.value = priority.MEDIUM;
  mediumOption.textContent = capitalize(priority.MEDIUM);
  lowOption.value = priority.LOW;
  lowOption.textContent = capitalize(priority.LOW);

  prioritySelect.appendChild(highOption);
  prioritySelect.appendChild(mediumOption);
  prioritySelect.appendChild(lowOption);

  notesTextArea.id = "to-do-notes";
  notesTextArea.name = "to-do-notes";
  notesTextArea.maxLength = 256;

  notesLabel.for = notesTextArea;
  notesLabel.textContent = "Notes:";

  checklistInput.id = "to-do-checklist";
  checklistInput.name = "to-do-checklist";
  checklistInput.type = "text";

  checklistLabel.for = "to-do-checklist";
  checklistLabel.textContent = "Checklist:";

  checklistButton.textContent = "Add To Checklist";
  checklistButton.className = "blue-button";
  checklistButton.type = "button";

  checklistInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addToChecklist(event.target, checklistDiv2);
    }
  });
  checklistButton.addEventListener("click", () =>
    addToChecklist(checklistInput, checklistDiv2)
  );

  cancelButton.className = "white-button";
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";

  submitButton.className = "blue-button";
  submitButton.id = "new-todo-submit";
  submitButton.textContent = "Add";

  checklistLabel.classList.add("two-columns");
  projectsDiv.className = "form-row";
  titleDiv.className = "form-row";
  dueDateDiv.className = "form-row";
  priorityDiv.className = "form-row";
  buttonDiv.className = "form-row";
  checklistDiv1.className = "form-row";
  checklistDiv2.classList.add("form-row");
  checklistDiv2.classList.add("added-checklist");
  notesDiv.className = "form-text-row";
  descriptionDiv.className = "form-text-row";
  descriptionTextArea.className = "form-description";

  projectsDiv.appendChild(projectsLabel);
  projectsDiv.appendChild(projectsSelect);
  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);
  titleDiv.appendChild(todoIdInput);
  descriptionDiv.appendChild(descriptionLabel);
  descriptionDiv.appendChild(descriptionTextArea);
  dueDateDiv.appendChild(dueDateLabel);
  dueDateDiv.appendChild(dueDateInput);
  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(prioritySelect);
  notesDiv.appendChild(notesLabel);
  notesDiv.appendChild(notesTextArea);
  checklistDiv1.appendChild(checklistLabel);
  checklistDiv1.appendChild(checklistInput);
  checklistDiv1.appendChild(checklistButton);
  buttonDiv.appendChild(cancelButton);
  buttonDiv.appendChild(submitButton);
  form.appendChild(formTitle);
  form.appendChild(projectsDiv);
  form.appendChild(titleDiv);
  form.appendChild(descriptionDiv);
  form.appendChild(dueDateDiv);
  form.appendChild(priorityDiv);
  form.appendChild(notesDiv);
  form.appendChild(checklistDiv1);
  form.appendChild(checklistDiv2);
  form.appendChild(buttonDiv);

  cancelButton.addEventListener("click", () => {
    dialog.open = false;
  });

  dialog.appendChild(form);
  return [dialog, form];
}

function addToChecklist(input, container) {
  const newChecklistInput = document.createElement("input");
  const deleteButton = document.createElement("button");

  newChecklistInput.name = "to-do-checklist";
  newChecklistInput.type = "text";
  newChecklistInput.value = input.value;
  newChecklistInput.disabled = true;
  input.value = "";

  deleteButton.textContent = "Delete";
  deleteButton.className = "red-button";

  container.appendChild(newChecklistInput);
  container.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    container.removeChild(newChecklistInput);
    container.removeChild(deleteButton);
  });
  input.focus();
}

function openNewTodoDialog(todoItem = undefined) {
  const dialog = document.querySelector(".todo-dialog");
  const todoIdInput = dialog.querySelector("#edit-todo-id");
  const dialogTitle = dialog.querySelector("#new-todo-title");
  const dialogSubmitButton = dialog.querySelector("#new-todo-submit");
  const title = dialog.querySelector("#to-do-title");
  const description = dialog.querySelector("#to-do-description");
  const dueDate = dialog.querySelector("#to-do-due-date");
  const prioritySelect = dialog.querySelector("#to-do-priority");
  const notes = dialog.querySelector("#to-do-notes");
  const checklist = dialog.querySelector("#to-do-checklist");
  const checklistDiv = dialog.querySelector(".added-checklist");

  if (todoItem) {
    dialogTitle.textContent = "Edit To Do Item";
    dialogSubmitButton.textContent = "Edit";
    todoIdInput.value = todoItem.id;
    title.value = todoItem.title;
    description.value = todoItem.description;
    dueDate.value = todoItem.dueDate;
    prioritySelect.value = todoItem.priority;
    notes.value = todoItem.notes;

    checklistDiv.innerHTML = "";

    for (let index = 1; index < todoItem.checklist.length; index++) {
      checklist.value = todoItem.checklist[index].text;
      addToChecklist(checklist, checklistDiv);
    }

    if (todoItem.checklist.length > 0) {
      checklist.value = todoItem.checklist[0].text;
    }
  } else {
    todoIdInput.value = null;
    dialogTitle.textContent = "New To Do Item";
    dialogSubmitButton.textContent = "Add";
    title.value = "";
    description.value = "";
    dueDate.value = "";
    prioritySelect.value = priority.HIGH;
    notes.value = "";
    checklist.value = "";
    checklistDiv.innerHTML = "";
  }

  dialog.open = true;
}

export { getTodoDialog, openNewTodoDialog };
