import { atom, selector } from "recoil";

export interface ITodo {
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[];
}
export interface IBoardState {
  boardId: string;
  toDos: string[];
}
// type IBoardState = [{ boardId: string; toDos: string[] }];

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
});
export const boardState = atom<IBoardState[]>({
  key: "boards",
  default: [
    { boardId: "toDo", toDos: ["eat", "sleep"] },
    { boardId: "progress", toDos: ["work", "running"] },
    { boardId: "done", toDos: ["exercise", "home"] },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const boards = get(boardState);
    return boards;
  },
  set: ({ get, set }, newValue: any) => {
    const board = get(boardState);
    const toDo = get(toDoState);
    const boardCopy = [...board];
    const targetBoardIndex = boardCopy.findIndex(
      (item) => item.boardId === newValue.props.boardId
    );
    const targetTaskCopy = boardCopy[targetBoardIndex];
    const targetToDos = [...targetTaskCopy.toDos];
    set(toDoState, targetToDos);

    // set(
    //   boardState,
    //   (boardCopy[targetBoardIndex] = {
    //     ...targetTaskCopy,
    //     toDos: setToDos,
    //   })
    // );
    // boardCopy[targetBoardIndex] = {
    //   ...targetTaskCopy,
    //   toDos: setToDos,
    // };
    // set(
    //   boardState,
    //   (boardCopy[targetBoardIndex] = {
    //     ...targetTaskCopy,
    //     toDos: setToDos,
    //   })
    // );
  },
});
