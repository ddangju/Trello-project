import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, IBoardState } from "../state/boards";
import TrelloBoards from "../components/Boards";
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Boards = styled.div`
  display: flex;
  height: 300px;
  gap: 20px;
`;
function MainPage() {
  const [boardList, setBoardList] = useRecoilState<IBoardState[]>(boardState);
  const onDragEnd: OnDragEndResponder = (result: DropResult) => {
    const { destination, source, type } = result;
    if (destination && type === "boards") {
      setBoardList((args) => {
        //1.전체 배열 복사
        const boardCopy = [...args];
        //2. 선택한 요소 복사
        const taskObj = boardCopy[source.index];
        //3.전체 배열에서 source.index삭제하기
        boardCopy.splice(source.index, 1);
        //4. 전체 배열에서 삭제한 인덱스 옮기려는 Index
        boardCopy.splice(destination.index, 0, taskObj);
        return boardCopy;
      });
    }
    if (destination && type === "task") {
      if (destination && destination.droppableId === source.droppableId) {
        setBoardList((prev) => {
          ///2. 전체 state복사
          const boardCopy = [...prev];
          //1.특정 index찾기
          const targetBoardIndex = prev.findIndex(
            (item) => item.boardId === destination.droppableId
          );
          ///3. 특정 index의 값 가져오기
          const targetBoard = boardCopy[targetBoardIndex];
          //4. 특정 index의 값의 toDos copy하기
          const newToDos = [...targetBoard.toDos];
          const [targetToDo] = newToDos.splice(source.index, 1);
          newToDos.splice(destination.index, 0, targetToDo);
          boardCopy[targetBoardIndex] = {
            ...targetBoard,
            toDos: newToDos,
          };
          return boardCopy;
        });
      }
      if (destination && destination.droppableId !== source.droppableId) {
        setBoardList((prev) => {
          ///1. 전체 배열 복사
          const boardCopy = [...prev];
          /// 2. source index찾기
          const sourceIndex = prev.findIndex(
            (item) => item.boardId === source.droppableId
          );
          /// 3. destination index찾기
          const targetBoardIndex = prev.findIndex(
            (item) => item.boardId === destination.droppableId
          );

          const sourceCopy = boardCopy[sourceIndex];
          const targetCopy = boardCopy[targetBoardIndex];

          const ToDosCopy = [...sourceCopy.toDos];
          const newToDosCopy = [...targetCopy.toDos];
          const [targetToDo] = ToDosCopy.splice(source.index, 1);
          newToDosCopy.splice(destination.index, 0, targetToDo);
          boardCopy[targetBoardIndex] = {
            ...targetCopy,
            toDos: newToDosCopy,
          };
          boardCopy[sourceIndex] = {
            ...sourceCopy,
            toDos: ToDosCopy,
          };
          return boardCopy;
        });
      }
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable droppableId="boards" type="boards" direction="horizontal">
            {(provided: DroppableProvided) => (
              <Boards ref={provided.innerRef} {...provided.droppableProps}>
                {Array.isArray(boardList) &&
                  boardList.map((item, idx) => {
                    return (
                      <TrelloBoards
                        boardId={item.boardId}
                        key={item.boardId}
                        toDos={item.toDos}
                        index={idx}
                        onDragEnd={onDragEnd}
                      />
                    );
                  })}
                {provided.placeholder}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default MainPage;

///index이슈
///boardState에서 boardId라는 key로 숫자 1부터 차례대로 값을 주었다
///그리고 Main.tsx에서 boardId를 Boards.tsx에 index라는 props으로 넘겨주었따
//Boards.tsx에서 받은 Boards.tsx draggableId로 지정해주니
//첫번째보드를 세번재 위치로 이동시켜도 destination.index가 다른 숫자로 찍히면서 drag and drop이 이상하게 밀려나는 이슈를 겪었다
//이 문제를 map함수의 두번째 인자인 index를 활용하여 draggableId값으로 지정해주니
//drag and drop이 밀리지 않고 잘 되었다..!
//해당 문제를 겪어보니 drag and drop은 인덱스로 이동이 가능한데,
//임의로 값을 지정하여(boardId:1,,요런 방식,,)움직이면 destination.index를 제대로 파악하지 못하여
//이슈가 나는 것을 확인하였따..
