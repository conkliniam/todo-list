import { format } from "date-fns";

class TodoItem {
  constructor(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
  }

  getListText() {
    return `${this.title}, Due: ${format(this.dueDate, "Mon dd, yyyy")}`;
  }
}

export default TodoItem;
