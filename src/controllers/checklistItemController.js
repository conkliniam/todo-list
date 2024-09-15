import { getProjectById, save } from "./projectController";

function toggleChecklistItemChecked(projectId, todoItemId, checklistItemId) {
  const project = getProjectById(projectId);
  const todoItem = project.getTodoItemById(todoItemId);
  const checklistItem = todoItem.getChecklistItemById(checklistItemId);
  checklistItem.toggleChecked();
  save();
}

export { toggleChecklistItemChecked };
