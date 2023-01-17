import { assignFormSubmit } from "../../../controlers/teamsController";

export default function assignUser () {
    return {
        template: `
        <div class="modal">
        <div class="modal-content">
            <form class="form small modal-form assign" action="#">
                <input type="hidden" id="teamId">
                <input type="text" id="userId" placeholder="ID">
                <input class="button login-button close-modal modal-close-btn" type="submit" name="assign-user" id="assignUserBtn" value="ASSIGN USER">
            </form>
        </div>
    </div>
        `,

        listeners: [
            {
                targetId: 'assignUserBtn',
                eventType: 'click',
                callback: assignFormSubmit
              },
        ]

        
    };
}