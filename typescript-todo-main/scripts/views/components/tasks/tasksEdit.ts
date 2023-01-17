import {submitTasksForm} from '../../../controlers/tasksControllers';

export default function tasksEditPage(action) {
    return {template: `
    <div class="form-holder section" id = "task-form">
    <input type="hidden" id="id" name="id"/>
    <input type="hidden" id="taskListId" name="taskListId"/>
    <input type="hidden" id="createDate" name= "createDate"/>
    <input type="hidden" id="updateDate" name= "updateDate"/>
      <h2 class="section-heading task-heading">${action} task</h2>
        <div class="task-form">
      <form>
      <div>
       <p><label class="task-label" for ="title">Title</label></p>
        <input class="task-input task-title" id="title" type="text" name="title"/>
            </div>      
            <div>
        <p><label class="task-label" for ="description">Description</label></p>
        <textarea class=" task-input" id ="description" rows ="4" cols = "30"></textarea>
        </div>
        <div>
    <input type = "checkbox" id = "isComplete" name = "isComplete"/>
        <label class="task-label" for ="isComplete">Complete</label>
        <input class="button task-button" type="submit" id="editTask" value=${action}Task />
        </div>
        </div>
      </form>
    </div>`,
    listeners:[
        {
            targetId: 'editTask',
            eventType: 'click',
            callback: submitTasksForm

            
        }
    ]
 }
}