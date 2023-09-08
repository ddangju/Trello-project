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
    to_do: [],
    doing: [],
    done: [],
  },
});
export const boardState = atom({
  key:"boards",
  default:[
    {id:1,text:"board1"},
    {id:2,text:"board2"},
    {id:3,text:"board3"}
  ]
});
