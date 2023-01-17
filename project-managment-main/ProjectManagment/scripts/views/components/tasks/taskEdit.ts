import { submitTaskForm} from "../../../controlers/tasksController";

export default function taskEditPage(action) {
    return {
        template: `
        <div class="modal">
        <div class="modal-content">
            <h2>${action}Task</h2>
            <form class="form modal-form" action="#">
             <input type="hidden" id="id"> 
            <input type="hidden" id="projectId" >
                <input id="title" type="text" placeholder="Title">
                <input id="description" type="textarea">
                <select class="status" name="status" id="status">
                    <option class="red" value="pending">pending</option>
                    <option class="yellod" value="In progress">In progress</option>
                    <option class="green" value="completed">completed</option>
                </select>
                <input id="assigneeId" type="text" placeholder="Assignee">
                <input class="button login-button close-modal modal-close-btn" type="button" id="taskSumbitBtn" value= ${action}Task >
            </form>
        </div>
    </div>`,

     listeners: [
        {
            targetId: 'taskSumbitBtn',
            eventType: 'click',
             callback: submitTaskForm, 
        }
    ] 
    }
}