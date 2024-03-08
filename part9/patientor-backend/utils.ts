import { Gender } from './types';

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (str: string): str is Gender =>
  Object.values(Gender)
    .map(v => v.toString())
    .includes(str);
