import {ProjectItem} from "../utils/models";
import {render, modal} from "../utils/helpers";
import {MAIN_CONTENT_SELECTOR} from "../utils/constants";
import projectsPage from "../views/pages/projects";
import ProjectsService from "../services/projectService"
import Project from "../entities/Project";
import projectEdit from "../views/components/projects/editProject";
import assignTeamToProject from "../views/components/projects/assignTeamToProject";
import {loadTasks} from "./tasksController";
import AuthenticationService from "../services/authenticationService";


/*
 * Generates and return one project
 */
function displayProject(currentProject: ProjectItem): HTMLElement {
    const {id, title, description} = currentProject;

    const loggedUser = AuthenticationService.getLoggedUser();
    const projectBox: HTMLElement = document.createElement('div') as HTMLElement;
    if (loggedUser.id === +currentProject.creatorId) {
        projectBox.innerHTML = `
        <div class="project-box">
             <div class="project-header">
              <h4>${title}</h4>
              <div class="buttons-container">
              <a class="assign-icon action-button project-assign-button" title="Assign team to the project"></a>
                 <a class="edit-icon action-button project-edit-button" title="Edit project"></a>
             <a class="delete-icon action-button project-delete-button" title="Delete project"></a>
             </div>
                     </div>
                  <article>${description}</article>
        </div>
    `;
        projectBox.querySelector('.project-box')
            .addEventListener('click', () => loadTasks(id));

        projectBox.querySelector('.project-assign-button')
            .addEventListener('click', (e) => {
                e.stopPropagation();
                addteam(id)
            });
        projectBox.querySelector('.project-edit-button')
            .addEventListener('click', (e) => {
                e.stopPropagation();
                editProject(id);
            });
        projectBox.querySelector('.project-delete-button')
            .addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.confirm("Delete Project?")) {
                    deleteProject(id)
                }
            });
    } else {

        projectBox.innerHTML = `
    <div class="project-box">
         <div class="project-header">
          <h3>${title}</h3>
         </div>
         <article>${description}</article>
    </div>
`;
        projectBox.querySelector('.project-box')
            .addEventListener('click', () => loadTasks(id));

    }
    return projectBox;
}

/*
 * Loads Projects Page
 */
export async function loadProjects(): Promise<void> {
    render(MAIN_CONTENT_SELECTOR, projectsPage());

    const projectsDashboard: HTMLElement = document.querySelector('.project-holder');
    const projects: Array<ProjectItem> = await ProjectsService.getAll();

    if (!projects) {
        return;
    }
    for (const project of projects) {
        projectsDashboard.appendChild(displayProject(project))
      
    }
    
    calculateProjects(projects);


}
/* Calculates the number of projects     */
function calculateProjects(projects: ProjectItem[]) {
    let numberOfProjecrs: number = projects.length;
    const displayNumber: HTMLElement = (document.querySelector('.info') as HTMLElement);
    displayNumber.innerHTML = `
    <p>${numberOfProjecrs.toString()}</p>
    <p><h3>Projects</h3><p>
    `;
}

export async function createNewProject(): Promise<void> {
    modal(projectEdit('Create'));
}

export async function editProject(id: string): Promise<any> {
    modal(projectEdit('Edit'));

    const project: ProjectItem = await ProjectsService.getById(id);

    (document.getElementById('id') as HTMLInputElement).value = project.id;
    (document.getElementById('title') as HTMLInputElement).value = project.title;
    (document.getElementById('description') as HTMLInputElement).value = project.description;
}

export async function submitProjectForm(): Promise<any> {
    const id: string = (document.getElementById('id') as HTMLInputElement).value;
    const title: string = (document.getElementById('title') as HTMLInputElement).value;
    const description: string = (document.getElementById('description') as HTMLInputElement).value;

    const project: Project = new Project(id, title, description);

    if (id === '') {
        await ProjectsService.addItem(project)
    } else {
        project.id = id;
        await ProjectsService.editItem(project)
    }
    await loadProjects()
}

/*Add Team to Project*/
export async function addteam(id: string) {
    modal(assignTeamToProject());

    const project: ProjectItem = await ProjectsService.getById(id);

    (document.getElementById('projectId') as HTMLInputElement).value = project.id;
}

export async function projectAssignSubmit() {
    const projectId: string = (document.getElementById('projectId') as HTMLInputElement).value;
    const teamId: string = (document.getElementById('teamId') as HTMLInputElement).value;

    await ProjectsService.assignToParrent(projectId, teamId, 'teamId');
}

export async function deleteProject(id: string): Promise<void> {
    await ProjectsService.deleteItem(id);

    await loadProjects()
}