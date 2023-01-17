function getDate(dateToday) {
var d = new Date();
var dateToday = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

    return dateToday;
}


function formatDate(date) {
    return date.slice(0, 10);
}