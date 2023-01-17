import { submitProjectForm } from "../../../controlers/projectsController";

export default function projectEdit(action) {
    return {
        template: `
        <div class="modal" id="edit-project">
        <div class="modal-content">
        <form action="#" class="form modal-form project-form">
        <h3>${action} project</h3>
            <input type="hidden" id="id" name="id" />
            <input type="text" id="title" placeholder="Title">
            <textarea id="description">Description</textarea>
            <input id="projectSubmit" class="button close-modal modal-close-btn login-button" type="submit" value=${action}Project />
        </form>
        </div>
    </div>`,
        listeners: [
            {
                targetId:'projectSubmit',
                eventType: 'click',
                callback: submitProjectForm,
              }
        ]
    }
}