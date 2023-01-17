function listsEditPage() {
    return `<input type="hidden" id="id" name="id" />
    
    <fieldset>
        <legend>List</legend>
       <form>
       
       <label for ="title">Ttile</label>
       <input type="text" id="title" name="title" />

        <input type="button" onclick="listsEditFormSubmit()" value="Save" /></td>
            
        </form>
    </fieldset>`;
}