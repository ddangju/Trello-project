import { atom } from 'recoil';

export interface ITodo {
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[];
}
export const toDoState = atom<IToDoState>({
  key: 'toDo',
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
});
export const boardState = atom({
  key: 'boards',
  default: [
    { boardId: 'toDo', toDos: ['eat', 'sleep'] },
    { boardId: 'progress', toDos: ['work', 'running'] },
    { boardId: 'done', toDos: ['exercise', 'home'] },
  ],
});
