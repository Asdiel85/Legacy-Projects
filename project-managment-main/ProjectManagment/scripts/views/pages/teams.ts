import {  createNewTeam } from "../../controlers/teamsController";

export default function teams() {
    return {
        template: ` 
        <section class="table-section">
        <div class="table-section-heading">
          <h3>Teams</h3>
          <button class="button create team-button" id="newTeamLink">+ CREATE TEAM</button>
        </div>
        <div class="table-holder">
          <table id="teamsTable">
            <thead>
              <tr>
              <th>Title</th>
              <th>Date of Creation</th>
                <th>Date of Last Change</th>
                <th colspan="3"></th>
              </tr>
            </thead>
          </table>
        </div>
      </section>
      `,
      listeners: [
          {
            targetId: 'newTeamLink',
            eventType: 'click',
            callback: () => createNewTeam ()
          },
      ]
    }
}