function listsPage() {
    return `
    <table id="listsTable">
        <tr>
            <td>ListId</td>
            <td>Title</td>
            <td>Date of Creation</td>
            <td>Id of Creator</td>
            <td>Date of last Change</td>
            <td>Id of the user that did the last change</td>
            <td></td>
            <td></td>
            <td><button id="newListLink" onclick="listsEditLinkClick()">New List</button></td>
            
        </tr>
    </table>`;
}