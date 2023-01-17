import {TeamItem} from "../utils/models";
import TeamsService from "../services/teamService";
import {render, modal, formatDate} from "../utils/helpers";
import {MAIN_CONTENT_SELECTOR} from "../utils/constants";
import teams from "../views/pages/teams";
import Team from "../entities/Team";
import teamEdit from "../views/components/teams/teamEdit";
import assignUser from "../views/components/teams/userAssign";
import {loadTeamManagment} from "./teamManagmentControler";


export async function addUser(id: string) {
    modal(assignUser());
    const team: TeamItem = await TeamsService.getById(id);

    (document.getElementById('teamId') as HTMLInputElement).value = team.id;

}

function generateTeamList(currentTeam: TeamItem): HTMLElement {
    const {id, title, createDate, updateDate} = currentTeam;

    const teamRow: HTMLElement = (document.createElement('tr') as HTMLElement);

    teamRow.innerHTML = `
    <td>${title}</td>
    <td>${formatDate(createDate)}</td>
    <td>${formatDate(updateDate)}</td>
    <td class = "action-buttons-container" colspan="3">
    <a class="assign-icon action-button team-assign-button" title="Assign user to the team"></a>
    <a class="edit-icon action-button team-edit-button" title="Edit team"></a>
    <a class="delete-icon action-button team-delete-button" title="Delete team"></a>
    </td>
    `;
    teamRow.addEventListener('click', () => loadTeamManagment(id));
    teamRow.querySelector('.team-assign-button')
        .addEventListener('click', (e) => {
            e.stopPropagation();
            addUser(id)
        });
    teamRow.querySelector('.team-edit-button')
        .addEventListener('click', (e) => {
            e.stopPropagation();
            editTeam(id)
        });
    teamRow.querySelector('.team-delete-button')
        .addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTeam(id)
        });

    return teamRow;
}

export async function loadTeams() {
    render(MAIN_CONTENT_SELECTOR, teams());

    const teamsTable: HTMLElement = (document.getElementById('teamsTable') as HTMLElement);
    const items: Array<TeamItem> = await TeamsService.getAll();

    if (!items) {
        return;
    }

    for (const currentItem of items) {
        teamsTable.appendChild(generateTeamList(currentItem));
    }
}

export async function createNewTeam(): Promise<void> {
    modal(teamEdit('Create'));
}


/**Shows the modal for Edit team */

export async function editTeam(id: string): Promise<void> {
    modal(teamEdit('Edit'));

    const team: TeamItem = await TeamsService.getById(id);

    (document.getElementById('id') as HTMLInputElement).value = team.id;
    (document.getElementById('title') as HTMLInputElement).value = team.title;
    (document.getElementById('createDate') as HTMLInputElement).value = team.createDate;
    (document.getElementById('updateDate') as HTMLInputElement).value = team.updateDate;


}

export async function submitTeamForm(): Promise<void> {
    const id: string = (document.getElementById('id') as HTMLInputElement).value;
    const title: string = (document.getElementById('title') as HTMLInputElement).value;
    const createDate: string = (document.getElementById('createDate') as HTMLInputElement).value;
    const updateDate: string = (document.getElementById('updateDate') as HTMLInputElement).value;

    const team: Team = new Team(id, title, createDate, updateDate);

    if (id === '') {
        await TeamsService.addItem(team);
    } else {
        team.id = id;
        await TeamsService.editItem(team);


    }
    loadTeams();
}

export async function deleteTeam(id: string): Promise<void> {

    await TeamsService.deleteItem(id);

    loadTeams();
}

export async function assignFormSubmit(): Promise<void> {

    const teamId: string = (document.getElementById('teamId') as HTMLInputElement).value;
    const userId: string = (document.getElementById('userId') as HTMLInputElement).value;

    await TeamsService.assignToParrent(teamId, userId, 'userId');
}