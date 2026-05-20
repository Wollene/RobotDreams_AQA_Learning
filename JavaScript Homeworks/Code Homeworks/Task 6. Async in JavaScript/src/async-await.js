const response = await fetchUsers();

export async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const usersArray = await response.json();
    return Array(usersArray)[0];
}

function showRawJsonData(data) {
    console.log(data);
}

function showUsersSummary(data) {
    console.log(`\nNumber of Users: ${data.length}
    \rNames:${data.map(element => ' ' + element.name)}
    \rUsernames:${data.map(element => ' ' + element.username)}
    \rCompanies:${data.map(element => ' ' + element.company.name)}`);
}

showRawJsonData(response);
showUsersSummary(response);
