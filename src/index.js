import "./styles.css";
import { getSavedProjects } from "./controllers/projectController";
import { updateProjectSidebar } from "./views/projectView";
import { loadHomePage } from "./views/homeView";

const projects = getSavedProjects();
const homeButton = document.querySelector("#home-button");
updateProjectSidebar(projects);

homeButton.addEventListener("click", () => loadHomePage(projects));

loadHomePage(projects);
