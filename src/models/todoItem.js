import { format } from "date-fns";
import ChecklistItem from "./checklistItem";

class TodoItem {
  constructor(title, description, dueDate, priority, notes, checklist, id) {
    this.update(title, description, dueDate, priority, notes, checklist);
    this.completionDate = "";
    this.id = id;
  }

  update(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist.map((text) => new ChecklistItem(text));
  }

  getListText() {
    if (this.completionDate) {
      return `${this.title} -- Due: ${format(
        this.dueDate,
        "M/d/yy, h:mma"
      )} -- Completed: ${format(this.completionDate, "M/d/yy, h:mma")}`;
    } else {
      return `${this.title} -- Due: ${format(this.dueDate, "M/d/yy, h:mma")}`;
    }
  }

  setCompletionDate(date) {
    this.completionDate = date;
  }
}

export default TodoItem;
