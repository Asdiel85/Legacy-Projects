function listsDetailsPage() {
    return `<fieldset>
    <table id = "tasksTable" >
    
    <tr>
        <td>Task id</td>
        <td>Title</td>
        <td>Date of Creation</td>
        <td>Creator Id</td>
        <td>Date of last Change</td>
        <td>Id of the user that did the last chabge</td>
        <td>ListId</td>
        <td>Completed</td>
        <td></td>
        <td><button id="newTaskLink">NewTask</button></td>
    </tr>
</table>  
</fieldset>
`;
}