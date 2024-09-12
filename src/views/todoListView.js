import { loadAndCreateTodo } from "./projectView";

function getTodoItemList(project) {
  const todoItems = project.getTodoItems();
  const container = document.createElement("ul");
  container.className = "home-todo-list";

  if (todoItems.length === 0) {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const addButton = document.createElement("button");

    span.textContent = "There are no To Do items for this project.";
    addButton.textContent = "New To Do";
    addButton.classList.add("white-button");
    addButton.classList.add("ml-25");
    addButton.addEventListener("click", () => {
      loadAndCreateTodo(project);
    });

    listItem.classList.add("home-todo-item");

    listItem.appendChild(span);
    listItem.appendChild(addButton);
    container.appendChild(listItem);

    return container;
  }

  for (const todoItem of todoItems) {
    const listItem = document.createElement("li");
    listItem.textContent = todoItem.getListText();
    if (todoItem.completionDate) {
      listItem.classList.add("completed");
    } else {
      listItem.classList.add(`${todoItem.priority}-priority`);
    }
    listItem.classList.add("home-todo-item");
    container.appendChild(listItem);
  }

  return container;
}

export { getTodoItemList };
