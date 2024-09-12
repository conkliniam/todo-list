function getProjectDialog(project = undefined) {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");
  const formTitle = document.createElement("h2");
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

  formTitle.textContent = "New Project";

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
  form.appendChild(nameDiv);
  form.appendChild(colorDiv);
  form.appendChild(buttonDiv);

  cancelButton.addEventListener("click", () => {
    dialog.open = false;
  });

  dialog.appendChild(form);
  return [dialog, form];
}

export { getProjectDialog };
