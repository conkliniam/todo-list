import { format, sub } from "date-fns";
import { capitalize } from "./viewHelper";
import { displayChecklist } from "./checklistView";
import chevronDown from "../images/chevron-down.svg";
import chevronUp from "../images/chevron-up.svg";
import pencilSquare from "../images/pencil-square.svg";
import trashFill from "../images/trash-fill.svg";
import { openNewTodoDialog } from "./newTodoView";

function displayTodoItem(container, project, todoItem) {
  const todoContainer = document.createElement("div");
  const header = document.createElement("div");
  const expand = document.createElement("img");
  const collapse = document.createElement("img");
  const expandButton = document.createElement("button");
  const editIcon = document.createElement("img");
  const editButton = document.createElement("button");
  const trashIcon = document.createElement("img");
  const deleteButton = document.createElement("button");
  const completeCheckbox = document.createElement("input");
  const todoTitle = document.createElement("h2");
  const dueDate = document.createElement("h2");
  const completionDate = document.createElement("h2");
  const body = document.createElement("div");
  const todoDescriptionTitle = document.createElement("h3");
  const todoDescriptionContent = document.createElement("pre");
  const todoPriorityTitle = document.createElement("h3");
  const todoPriorityContent = document.createElement("h3");
  const todoNotesTitle = document.createElement("h3");
  const todoNotesContent = document.createElement("pre");
  const checklistTitle = document.createElement("h3");
  const checklistContainer = document.createElement("ul");
  const dialog = document.querySelector("#completion-date-dialog");

  todoContainer.id = `todo-container-${todoItem.id}`;
  todoContainer.classList.add(`${todoItem.priority}-priority`);
  todoContainer.classList.add("todo-container");
  completeCheckbox.classList.add("todo-complete");
  completionDate.classList.add("todo-complete-date");

  completeCheckbox.type = "checkbox";

  updateCompletionDisplay(
    todoItem,
    todoContainer,
    completeCheckbox,
    completionDate
  );

  todoTitle.textContent = todoItem.title;
  todoTitle.classList.add("todo-title");

  dueDate.classList.add("todo-due-date");
  displayDueDate(todoItem.dueDate, dueDate);

  todoDescriptionTitle.textContent = "Description: ";
  todoDescriptionContent.textContent = todoItem.description;
  todoPriorityTitle.textContent = "Priority: ";
  todoPriorityContent.textContent = capitalize(todoItem.priority);
  todoNotesTitle.textContent = "Notes: ";
  todoNotesContent.textContent = todoItem.notes;
  checklistTitle.textContent = "Checklist:";

  todoDescriptionContent.classList.add("todo-description-content");
  todoPriorityContent.classList.add("todo-priority-content");
  todoNotesContent.classList.add("todo-notes-content");

  header.classList.add("todo-header");
  todoContainer.classList.add("todo-container");
  checklistContainer.classList.add("todo-checklist");
  body.classList.add("todo-body");

  expandButton.classList.add("blue-button");
  editButton.classList.add("blue-button");
  deleteButton.classList.add("red-button");
  expand.src = chevronDown;
  collapse.src = chevronUp;
  editIcon.src = pencilSquare;
  trashIcon.src = trashFill;
  collapse.classList.toggle("display-none");
  body.classList.toggle("display-none");

  expandButton.appendChild(expand);
  expandButton.appendChild(collapse);
  editButton.appendChild(editIcon);
  deleteButton.appendChild(trashIcon);

  expandButton.addEventListener("click", () => {
    expand.classList.toggle("display-none");
    collapse.classList.toggle("display-none");
    body.classList.toggle("display-none");
  });

  displayChecklist(todoItem.checklist, checklistContainer);

  header.appendChild(expandButton);
  header.appendChild(completeCheckbox);
  header.appendChild(editButton);
  header.appendChild(deleteButton);
  header.appendChild(todoTitle);
  header.appendChild(dueDate);
  header.appendChild(completionDate);
  body.appendChild(todoDescriptionTitle);
  body.appendChild(todoDescriptionContent);
  body.appendChild(todoPriorityTitle);
  body.appendChild(todoPriorityContent);
  body.appendChild(todoNotesTitle);
  body.appendChild(todoNotesContent);
  body.appendChild(checklistTitle);
  body.appendChild(checklistContainer);
  todoContainer.appendChild(header);
  todoContainer.appendChild(body);

  container.appendChild(todoContainer);

  completeCheckbox.addEventListener("change", (event) => {
    event.preventDefault();
    const isComplete = !!todoItem.completionDate;

    if (isComplete) {
      todoItem.setCompletionDate(null);
    } else {
      const dateInput = dialog.querySelector("#completion-date");
      const todoIdInput = dialog.querySelector("#todo-item-id");
      todoIdInput.value = todoItem.id;
      const now = format(new Date(), "yyyy-MM-dd'T'HH:mm");
      dateInput.max = now;
      dateInput.value = now;
      dialog.open = true;
    }

    updateCompletionDisplay(
      todoItem,
      todoContainer,
      completeCheckbox,
      completionDate
    );
  });

  editButton.addEventListener("click", () => openNewTodoDialog(todoItem));

  deleteButton.addEventListener("click", () => {
    project.removeTodoItem(todoItem);
    container.removeChild(todoContainer);
  });
}

function displayDueDate(dueDate, displayElement) {
  displayElement.textContent = `Due: ${format(
    dueDate,
    "MMM dd, yyyy, h:mm a"
  )}`;

  const now = new Date();

  if (now > new Date(dueDate)) {
    displayElement.classList.add("past-due");
  } else if (now > sub(dueDate, { weeks: 1 })) {
    displayElement.classList.add("due-soon");
  }
}

function updateTodoItem(container, todoItem) {
  const todoContainer = container.querySelector(
    `#todo-container-${todoItem.id}`
  );
  const todoTitle = todoContainer.querySelector(".todo-title");
  const todoDueDate = todoContainer.querySelector(".todo-due-date");
  const todoDescriptionContent = todoContainer.querySelector(
    ".todo-description-content"
  );
  const todoPriorityContent = todoContainer.querySelector(
    ".todo-priority-content"
  );
  const todoNotesContent = todoContainer.querySelector(".todo-notes-content");
  const todoChecklist = todoContainer.querySelector(".todo-checklist");

  todoTitle.textContent = todoItem.title;
  displayDueDate(todoItem.dueDate, todoDueDate);
  todoDescriptionContent.textContent = todoItem.description;
  todoPriorityContent.textContent = capitalize(todoItem.priority);
  todoNotesContent.textContent = todoItem.notes;

  todoChecklist.innerHTML = "";
  displayChecklist(todoItem.checklist, todoChecklist);
}

function updateCompletionDisplay(
  todoItem,
  todoContainer,
  checkbox,
  completionDate
) {
  const isComplete = !!todoItem.completionDate;

  if (isComplete) {
    completionDate.textContent = `Completed: ${format(
      todoItem.completionDate,
      "MMM dd, yyyy, h:mm a"
    )}`;
    todoContainer.classList.add("completed");
    todoContainer.classList.remove("in-progress");
    completionDate.classList.add("display-inline");
    completionDate.classList.remove("display-none");
    checkbox.checked = true;
  } else {
    todoContainer.classList.remove("completed");
    todoContainer.classList.add("in-progress");
    completionDate.classList.add("display-none");
    completionDate.classList.remove("display-inline");
    checkbox.checked = false;
  }
}

function handleSetCompletionDate(event, todoItem, todoContainer) {
  const form = event.target;
  const dateInput = form.querySelector("#completion-date");
  const completeCheckbox = todoContainer.querySelector(".todo-complete");
  const completionDate = todoContainer.querySelector(".todo-complete-date");
  todoItem.setCompletionDate(dateInput.value);
  updateCompletionDisplay(
    todoItem,
    todoContainer,
    completeCheckbox,
    completionDate
  );
}

function getCompletionDialog() {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");
  const rowDiv = document.createElement("div");
  const completionDateLabel = document.createElement("label");
  const completionDateInput = document.createElement("input");
  const todoItemId = document.createElement("input");
  const buttonDiv = document.createElement("div");
  const cancelButton = document.createElement("button");
  const submitButton = document.createElement("button");

  form.method = "dialog";
  form.id = "completion-date-form";
  dialog.id = "completion-date-dialog";

  completionDateInput.id = "completion-date";
  completionDateInput.name = "completion-date";
  completionDateInput.type = "datetime-local";

  completionDateLabel.for = "completion-date";
  completionDateLabel.textContent = "Date Completed:";

  todoItemId.id = "todo-item-id";
  todoItemId.type = "hidden";

  cancelButton.type = "button";

  cancelButton.textContent = "Cancel";
  submitButton.textContent = "Mark Complete";

  cancelButton.addEventListener("click", () => {
    dialog.open = false;
  });

  rowDiv.classList.add("form-row");
  buttonDiv.classList.add("form-row");
  cancelButton.classList.add("white-button");
  submitButton.classList.add("blue-button");

  rowDiv.appendChild(completionDateLabel);
  rowDiv.appendChild(completionDateInput);
  buttonDiv.appendChild(cancelButton);
  buttonDiv.appendChild(submitButton);
  form.appendChild(rowDiv);
  form.appendChild(todoItemId);
  form.appendChild(buttonDiv);
  dialog.appendChild(form);

  return [dialog, form];
}

export {
  displayTodoItem,
  getCompletionDialog,
  handleSetCompletionDate,
  updateTodoItem,
};
