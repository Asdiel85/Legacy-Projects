import { createNewProject } from "../../controlers/projectsController";


export default function projectsPage() {
    return { 
    template: `
    <section class="details-section" id="projects-page">
    <h3 class="dash-h3">Dashboard</h3>
    <div class="dashboard-holder">
    <div class="number-of-projects">
    <div class="picture"></div>
    <div class="info"></div>
    </div>
    <div>
    2
    </div>
    <div>
    3
    </div>
    </div>
    <div class="prject-header">
    <h3>Projects</h3>
    <button class="button create" id="create-project-btn">+ CREATE PROJECT</button>
    </div>
    <div class="project-holder"></div>
</section>
    `,
    listeners: [
        {
          targetId: 'create-project-btn',
          eventType: 'click',
          callback: () => createNewProject()
        },
      ]
    };
}