import { getProjectById } from "./projectController";
import TodoItem from "../models/todoItem";

function addTodoItemToProject(todoFields, projectId) {
  const { id, title, description, dueDate, priority, notes, checklist } =
    todoFields;
  const project = getProjectById(projectId);

  const newId = project.nextId();

  const todoItem = new TodoItem(
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    newId
  );

  project.addTodoItem(todoItem);
  return [project, todoItem];
}

function editTodoItemInProject(todoFields, projectId) {
  const { id, title, description, dueDate, priority, notes, checklist } =
    todoFields;
  const project = getProjectById(projectId);

  const todoItem = project.getTodoItemById(id);
  todoItem.update(title, description, dueDate, priority, notes, checklist);

  return [project, todoItem];
}

export { addTodoItemToProject, editTodoItemInProject };
