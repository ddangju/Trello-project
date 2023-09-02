import { atom } from "recoil";

export const toDoState = atom<String[]>({
  key: "toDo",
  default: ["a", "b", "c", "d", "e", "f"],
});
// export const toDoSelector = selector({
//   key: "toDoSelector",
//   get: ({ get }) => {
//     const toDos = get(toDoState);
//   },
//   set: ({ set }) => {},
// });
