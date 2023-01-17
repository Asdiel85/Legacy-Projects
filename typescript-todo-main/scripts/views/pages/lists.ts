import {createNewList} from "../../controlers/listsControllers";

export default function listsPage() {
    return { template: `<section class="table-section">
    <div class="table-section-heading"> 
    <h2>TODO List</h2>
    <button class="button" id="newListLink">+ Add TODO</button>
    </div>
    <div class="table-holder">
     <table id="listsTable">
        <thead>
        <tr>
            <th>Title</th>
            <th>Date of Creation</th>
            <th class="hide-list">Date of last Change</th>
            <th colspan="3"></th>          
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    </div>
    </section>`,
    listeners: [
        {
            targetId: 'newListLink',
            eventType: 'click',
            callback: () => createNewList('Create') 
        }
]
    };
}
