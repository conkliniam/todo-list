import { format } from "date-fns";
import ChecklistItem from "./checklistItem";

class TodoItem {
  constructor(
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    id,
    completionDate = ""
  ) {
    this.update(title, description, dueDate, priority, notes, checklist);
    this.id = id;
    this.completionDate = completionDate;
  }

  update(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist.map(
      (checklistItem, index) =>
        new ChecklistItem(checklistItem.text, checklistItem.checked, index)
    );
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

  getChecklistItemById(id) {
    return this.checklist.find(
      (checklistItem) => checklistItem.id === Number(id)
    );
  }

  setCompletionDate(date) {
    this.completionDate = date;
  }
}

export default TodoItem;
