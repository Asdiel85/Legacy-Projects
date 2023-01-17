export default function listsDetailsPage() {
    return {
        template: `
    <div id = "tasksTable" >  
    <h2 class="form-header" id="tasks-h2">TODO Tasks Managment</h2>
</div>
    <div class="list-form list-container tasks">
      <a class="action-button new-task" href="#" id="newTaskLink"></a>
    </div>  
    `,
        listeners: []
    };
}