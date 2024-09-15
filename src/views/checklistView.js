import { toggleChecklistItemChecked } from "../controllers/checklistItemController";

function displayChecklist(projectId, todoItemId, checklist, container) {
  if (checklist.length === 0) {
    const item = document.createElement("li");
    item.className = "checklist-item";
    item.textContent = "Empty";
    container.appendChild(item);

    return;
  }

  for (const checklistItem of checklist) {
    const item = document.createElement("li");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.checked = checklistItem.checked;

    text.textContent = checklistItem.text;

    checkbox.addEventListener("change", () => {
      toggleChecklistItemChecked(projectId, todoItemId, checklistItem.id);
    });

    item.classList.add("checklist-item");
    checkbox.classList.add("checklist-checkbox");
    text.classList.add("checklist-text");
    item.appendChild(checkbox);
    item.appendChild(text);
    container.appendChild(item);
  }
}

export { displayChecklist };
