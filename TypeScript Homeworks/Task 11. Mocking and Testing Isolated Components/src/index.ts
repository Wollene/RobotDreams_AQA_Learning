import { User } from './classes/User';
import { getUser } from './services/api.services';

const endpoint = 'https://jsonplaceholder.typicode.com/users/';
const userArray: User[] = [];

for (let i = 1; i < 6; i++) {
    userArray.push(await getUser(endpoint + i));
}

for (const user of userArray) {
    console.log(`-==========- ${userArray.indexOf(user) + 1} USER INFO -===========-
        \r${user.getFullName()}
        \r-==========- ADDRESS INFO -==========-
        \r${user.getAddressInfo()}
        \r-==========- COMPANY INFO -==========-
        \r${user.getCompanyInfo()}\n`);
}
