import { projectAssignSubmit } from "../../../controlers/projectsController";

export default function assignTeamToProject () {
    return {
        template: `
        <div class="modal assign-team" id="assignUserToProject">
        <div class="modal-content">
            <form class="form small modal-form" action="#">
                <input type="hidden" id="projectId">
                <input type="text" id="teamId" placeholder="ID">
                <input class="button close-modal modal-close-btn" type="submit" name="assign-team" id="assignTeamBtn" value="SAVE">
            </form>
            </div>
        </div>`,

        listeners: [
            {
                targetId: 'assignTeamBtn',
                eventType: 'click',
                callback: projectAssignSubmit
              },
        ]

        
    }
}