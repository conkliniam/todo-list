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

  textColor() {
    const r = parseInt(this.color.slice(1, 3), 16);
    const g = parseInt(this.color.slice(3, 5), 16);
    const b = parseInt(this.color.slice(5), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
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
