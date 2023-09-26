import { atom } from "recoil";
export interface IBoardState {
  boardId: string;
  toDos: string[];
}

export const boardState = atom({
  key: "boards",
  default: [
    { boardId: "toDo", toDos: ["eat", "sleep"] },
    { boardId: "progress", toDos: ["work", "running"] },
    { boardId: "done", toDos: ["exercise", "home"] },
  ],
});
