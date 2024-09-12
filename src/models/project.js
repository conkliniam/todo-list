class Project {
  constructor(name, id, color) {
    this.name = name;
    this.id = `project-${id}`;
    this.color = color;
    this.todoItems = [];
  }

  getTodoItems() {
    return [...this.todoItems].sort(sortByDates);
  }

  addTodoItem(todoItem) {
    this.todoItems.push(todoItem);
  }

  nextId() {
    if (this.todoItems.length === 0) {
      return 0;
    } else {
      return this.todoItems[this.todoItems.length - 1].id + 1;
    }
  }

  getTodoItemById(todoId) {
    const todoItem = this.todoItems.find((item) => todoId === item.id);
    return todoItem;
  }

  removeTodoItem(todoItem) {
    const index = this.todoItems.indexOf(todoItem);
    if (index > -1) {
      this.todoItems.splice(index, 1);
    }
  }
}

function sortByDates(todoA, todoB) {
  if (todoB.completionDate) {
    if (todoA.completionDate) {
      return new Date(todoB.completionDate) - new Date(todoA.completionDate);
    }

    return -1;
  }

  if (todoA.completionDate) {
    return 1;
  }

  return new Date(todoA.dueDate) - new Date(todoB.dueDate);
}

export default Project;
