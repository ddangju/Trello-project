import { useRecoilState } from "recoil";
import { IBoardState, boardState } from "../store/atoms";

function useSetBoard(prev: any, props: any, value: any) {
  const [boardList, setBoardList] = useRecoilState<IBoardState[]>(boardState);
  setBoardList((prev) => {
    const boardCopy = [...prev];
    const targetBoardIndex = prev.findIndex(
      (item) => item.boardId === props.boardId
    );
    const targetTaskCopy = boardCopy[targetBoardIndex];
    const targetToDos = [...targetTaskCopy.toDos];
    const setToDos = [...targetToDos, value.toDo];
    boardCopy[targetBoardIndex] = {
      ...targetTaskCopy,
      toDos: setToDos,
    };
    return boardCopy;
  });
}

export default useSetBoard;
