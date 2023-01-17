export default function projectDetails () {
    return {
        template: `
        <div class="project-details-holder">
        <h3>Project Name</h3>
    </div>
    <div class="tasks-header">
        <h3>Tasks</h3>
        <input class="button create" type="button" value="+ CREATE TASK" id="taskCreateBtn">
    </div>
    <div class="task-holder"></div>
            `,
            listeners: []  
    };
}