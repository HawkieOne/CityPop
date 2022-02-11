import { atom } from 'recoil';

export const searchTypeState = atom({
  key: 'searchTypeState',
  default: "city",
});

export const resultState = atom({
  key: 'resultState',
  default: null,
});