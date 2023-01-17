import {submitListForm} from "../../../controlers/listsControllers";

export default function listsEditPage(action) {
    return { template: `<input type="hidden" id="id" name="id" />
    <input type="hidden" id="createDate" name= "createDate"/>
    <input type="hidden" id="updateDate" name= "updateDate"/>
    <div class="forms-container section list">
      <h2 class="section-heading list-title">${action} list</h2>
       <form class="list-form" id="list-form">
       <div>
       <label for ="title"></label>
       <input type="text" id="title" name="title" placeholder="Title" />
        </div>
        <input class="button" type="submit" id="editListButton" value=${action}TODOlist />
        </form>
    </div>`,
    listeners: [
        {
            targetId: 'editListButton',
           eventType: 'click',
           callback: submitListForm
    }
        ]
    };
}