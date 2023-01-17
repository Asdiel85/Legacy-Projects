import { submitTeamForm } from "../../../controlers/teamsController";

export default function teamEdit (action) {
    return {
        template: `<div class="modal team-modal" id="teamForm">
        <form class="form small modal-form modal-content action="#">
        <h3> ${action} Team</h3>
        <input type="hidden" id="id" name= "id"/>
        <input id="title" type="text" placeholder="Title">
        <input type="hidden" id="createDate" name= "createDate"/>
        <input type="hidden" id="updateDate" name= "updateDate"/>       
            <input id="teamSubmit" class="button close-modal modal-close-btn login-button" type="submit" value=${action}Team />
        </form>
    </div>`,

        listeners: [
            {
                targetId: 'teamSubmit',
                eventType:'click',
                callback: submitTeamForm
              }
        ]
    }
}