function getProjectDialog() {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");
  const formTitle = document.createElement("h2");
  const projectId = document.createElement("input");
  const nameLabel = document.createElement("label");
  const nameInput = document.createElement("input");
  const nameDiv = document.createElement("div");
  const colorLabel = document.createElement("label");
  const colorInput = document.createElement("input");
  const colorDiv = document.createElement("div");
  const cancelButton = document.createElement("button");
  const submitButton = document.createElement("button");
  const buttonDiv = document.createElement("div");

  dialog.classList.add("project-dialog");
  form.method = "dialog";

  formTitle.classList.add("project-form-title");
  formTitle.textContent = "New Project";

  projectId.id = "project-id";
  projectId.type = "hidden";
  projectId.value = null;

  nameInput.id = "project-name";
  nameInput.name = "project-name";
  nameInput.type = "text";
  nameInput.required = true;
  nameInput.maxLength = 30;

  colorInput.id = "project-color";
  colorInput.name = "project-color";
  colorInput.type = "color";

  nameLabel.for = "project-name";
  nameLabel.textContent = "Project Name:";

  colorLabel.for = "project-color";
  colorLabel.textContent = "Project Color:";

  cancelButton.className = "white-button";
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";

  submitButton.className = "blue-button";
  submitButton.id = "submit-project";
  submitButton.textContent = "Add";

  nameDiv.className = "form-row";
  colorDiv.className = "form-row";
  buttonDiv.className = "form-row";

  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInput);
  colorDiv.appendChild(colorLabel);
  colorDiv.appendChild(colorInput);
  buttonDiv.appendChild(cancelButton);
  buttonDiv.appendChild(submitButton);
  form.appendChild(formTitle);
  form.appendChild(projectId);
  form.appendChild(nameDiv);
  form.appendChild(colorDiv);
  form.appendChild(buttonDiv);

  cancelButton.addEventListener("click", () => {
    dialog.open = false;
  });

  dialog.appendChild(form);
  return [dialog, form];
}

function openProjectDialog(project = null) {
  const dialog = document.querySelector(".project-dialog");
  const formTitle = dialog.querySelector(".project-form-title");
  const idInput = dialog.querySelector("#project-id");
  const nameInput = dialog.querySelector("#project-name");
  const colorInput = dialog.querySelector("#project-color");
  const submitButton = dialog.querySelector("#submit-project");

  if (project) {
    formTitle.textContent = "Edit Project";
    idInput.value = project.id;
    nameInput.value = project.name;
    colorInput.value = project.color;
    submitButton.textContent = "Edit";
  } else {
    formTitle.textContent = "New Project";
    idInput.value = null;
    nameInput.value = "";
    colorInput.value = "#000000";
    submitButton.textContent = "Add";
  }

  dialog.open = true;
}

export { getProjectDialog, openProjectDialog };
