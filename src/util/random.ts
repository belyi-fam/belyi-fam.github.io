const randomNumber = (max: number, min: number = 0) => Math.floor((Math.random() * (max - min)) + min);

export const getRandom = <T>(a: T[]): T => a[randomNumber(a.length)];

export const randomize = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};
