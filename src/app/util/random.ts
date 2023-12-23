const randomNumber = (max: number, min: number = 0) => Math.floor((Math.random() * (max - min)) + min);
export const getRandom = <T>(a: T[]): T => a[randomNumber(a.length)];
