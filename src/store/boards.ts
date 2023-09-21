import { atom, selector } from "recoil";

export const boardState = atom({
  key: "boards",
  default: [
    { boardId: "toDo", toDos: ["eat", "sleep"] },
    { boardId: "progress", toDos: ["work", "running"] },
    { boardId: "done", toDos: ["exercise", "home"] },
  ],
});
