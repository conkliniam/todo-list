import Project from "../models/project";

const projects = [];

function save() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function getSavedProjects() {
  projects.length = 0;

  if (!localStorage.getItem("projects")) {
    const defaultProject = new Project("Default", 0, "#ef9b9b");
    projects.push(defaultProject);
  } else {
    const projectObjects = JSON.parse(localStorage.getItem("projects"));

    for (const projectObject of projectObjects) {
      const newProject = new Project(
        projectObject.name,
        projectObject.id,
        projectObject.color,
        projectObject.todoItems
      );
      projects.push(newProject);
    }
  }

  return projects;
}

function getProjectById(projectId) {
  const project = projects.find((project) => project.id === Number(projectId));

  return project;
}

function addProject(name, color) {
  const nextId = getNextId();
  const newProject = new Project(name, nextId, color);
  projects.push(newProject);
  save();
  return newProject;
}

function getNextId() {
  if (projects.length > 0) {
    return projects[projects.length - 1].id + 1;
  }

  return 0;
}

function removeProject(project) {
  const index = projects.indexOf(project);
  if (index > -1) {
    projects.splice(index, 1);
  }
  save();
}

function editProject(id, name, color) {
  const project = getProjectById(id);
  project.name = name;
  project.color = color;
  save();
  return project;
}

export {
  getSavedProjects,
  addProject,
  getProjectById,
  editProject,
  removeProject,
  save,
};
