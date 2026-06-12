declare global {
    var url: string;
}

export function mochaGlobalSetup(): void {
    globalThis.url = 'https://jsonplaceholder.typicode.com/users/1';
};
