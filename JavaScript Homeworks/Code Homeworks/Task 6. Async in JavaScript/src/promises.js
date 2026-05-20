fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        showRawJsonData(data);
        showUsersSummary(Array(data)[0]);
    });

function showRawJsonData(data) {
    console.log(data);
}

function showUsersSummary(data) {
    console.log(`\nNumber of Users: ${data.length}
    \rNames:${data.map(element => ' ' + element.name)}
    \rUsernames:${data.map(element => ' ' + element.username)}
    \rCompanies:${data.map(element => ' ' + element.company.name)}`);
};
