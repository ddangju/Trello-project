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
  key:"boards",
  default:[
    {id:1,boardId:"board1",toDos:[]},
    {id:2,boardId:"board2",toDos:[]},
    {id:3,boardId:"board3",toDos:[]}
  ]
});
