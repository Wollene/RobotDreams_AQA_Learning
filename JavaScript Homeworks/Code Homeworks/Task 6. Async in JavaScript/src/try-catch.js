const mainUrl = 'https://hahdiajkjd.io/users';
const backupUrl = 'https://jsonplaceholder.typicode.com/users';

async function fetchUsers(url) {
    const response = await fetch(url);
    const usersArray = await response.text();
    return Array(usersArray)[0];
}

try {
    console.log(`Fetching Users via Main URL: \n${await fetchUsers(mainUrl)}`);
} catch (error) {
    if (error.name === 'TypeError') {
        console.log(`Main URL is unavailable.
        \rFetching Users via Backup URL: \n${await fetchUsers(backupUrl)}`);
    } else {
        console.log('Something went wrong. See the logs for details.');
    }
}
