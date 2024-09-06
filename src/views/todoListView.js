function getTodoItemList(todoItems) {
  const container = document.createElement("ul");
  container.className = "home-todo-list";
  const sortedTodos = [...todoItems].sort((a, b) => a.dueDate - b.dueDate);

  if (sortedTodos.length === 0) {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const addButton = document.createElement("button");

    span.textContent = "There are no To Do items for this project.";
    addButton.textContent = "New To Do";
    addButton.className = "white-button";

    listItem.appendChild(span);
    listItem.appendChild(addButton);
    container.appendChild(listItem);

    return container;
  }

  for (const todoItem of sortedTodos) {
    const listItem = document.createElement("li");
    listItem.textContent = todoItem.getListText();
    listItem.className = todoItem.priority;
    container.appendChild(listItem);
  }

  return container;
}

export { getTodoItemList };
