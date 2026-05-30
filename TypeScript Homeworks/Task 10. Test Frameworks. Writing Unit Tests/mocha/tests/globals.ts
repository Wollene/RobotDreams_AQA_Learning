import { User } from '../../../Task 8. Interfaces, Types and Classes/src/classes/User';
import { getUser } from '../../../Task 8. Interfaces, Types and Classes/src/services/api.services';

declare global {
    var user: User;
}

export async function mochaGlobalSetup(): Promise<void> {
    globalThis.user = await getUser('https://jsonplaceholder.typicode.com/users/10');
}
