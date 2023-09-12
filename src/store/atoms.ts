import { atom } from "recoil";

export interface ITodo {
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
});
export const boardState = atom({
  key: "boards",
  default: [
    { boardId: "toDo", toDos: ["밥먹기", "잠먹기"] },
    { boardId: "progress", toDos: ["똥싸기", "쉬싸기"] },
    { boardId: "done", toDos: ["출근하기", "퇴근하기"] },
  ],
});
