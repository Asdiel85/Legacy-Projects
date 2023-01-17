export default function taskDetails() {
return {
    template: `
    <h3 class="task-details-h3">Task</h3>
    <div class="current-project-box task-holder"> 
    </div>
    <div class="workLog-header tasks-header">
    <h3>Work Log</h3>
    <input class="button create close-modal modal-close-btn" type="button" value= "+ LOG WORK" id="logCreateBtn">
    </div>
    <div class="workLog-holder task-holder"></div>
    `,
    listeners: []  
    };
}