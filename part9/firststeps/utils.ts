// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (argument: any): boolean => typeof argument === 'number';

export default 'this is the default...';
