export function generateRandomNumber(start = 1000000, finish = 9999999): number {
    return Math.floor(Math.random() * (finish - start) + start);
};

export function generateRandomString(length = 10): string {
    const array = new Array(length).fill(0);
    return array.map(() => {
        return Math.floor(Math.random() * 35).toString(36);
    }).join('');
};
