function tasksEditPage() {
    return `<input type="hidden" id="id" name="id" />
    <input type="hidden" id="listId" name="listId" />
    <fieldset>
        <legend>New Task</legend>
            <form>
                <label for ="title">Ttile</label>
                <input type="text" id="title" name="title" /><br>
                <label for ="description">Description</label><br>
                <textarea id ="description" rows ="4" cols = "40"></textarea>
 
                <label for ="isComplete">isComplete</label>
            <input type = "checkbox" id = "isComplete" onclick ="taskComplete()"; name = "isComplete"/>
         
                <input type="button" onclick="tasksEditFormSubmit()" value="Save" />
       
    </fieldset>`;
}