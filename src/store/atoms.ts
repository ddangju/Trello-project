import { atom } from 'recoil';

export interface ITodo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[];
}
export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    to_do: [
      { text: 'g', id: 1 },
      { text: 'g', id: 2 },
    ],
    doing: [],
    done: [],
  },
});
