import { User } from '../classes/User';

export async function getUser(url: string): Promise<User> {
    try {
        const response = await fetch(url);
        const userData = await response.json();
        return new User(userData);
    } catch {
        throw new Error('Failed to send a request.');
    }
}
