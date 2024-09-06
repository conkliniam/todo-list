class Project {
  todoItems = [];

  constructor(name, id, color) {
    this.name = name;
    this.id = `project-${id}`;
    this.color = color;
  }

  getTodoItems() {
    return this.todoItems;
  }

  addTodoItem(todoItem) {
    this.todoItems.push(todoItem);
  }

  removeTodoItem(todoItem) {
    if (this.todoItems.includes(todoItem)) {
      let index = this.todoItems.findIndex(todoItem);
      this.todoItems.splice(index, 1);
    }
  }
}

export default Project;
