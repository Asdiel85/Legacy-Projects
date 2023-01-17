import {render} from "../utils/helpers";
import {MAIN_CONTENT_SELECTOR} from "../utils/constants";
import {UserItem} from "../utils/models";
import TeamService from "../services/teamService";
import teamManagment from "../views/pages/teamManagment";
import Team from "../entities/Team";

function generateTeamMembers(currentUser: UserItem): HTMLElement {
    const {id, firstName, lastName, username,} = currentUser;

    const table: HTMLElement = (document.querySelector('.team-table') as HTMLElement);
    const userRow: HTMLElement = document.createElement('tr') as HTMLElement;

    table.appendChild(userRow);

    userRow.innerHTML = `
    <td>${id}</td>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${username}</td>
   <td><a class="delete-icon action-button member-delete-button" title="Delete team"></a></td>
    `;

    userRow.querySelector('.member-delete-button')
        .addEventListener('click', () => teamDeleteMember(id));

    return userRow;
}

export async function loadTeamManagment(id: string): Promise<void> {
    render(MAIN_CONTENT_SELECTOR, teamManagment());

    const team: Team = await TeamService.getById(id);
    const members: Array<UserItem> = await TeamService.getMembers(team.id);

    if (!members) {
        return;
    }

    for (const member of members) {
        generateTeamMembers(member)
    }

}

export async function teamDeleteMember(id: string): Promise<void> {
    await TeamService.deleteItem(id);
}