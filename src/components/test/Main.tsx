import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { boardState, toDoState } from '../../store/atoms';
import TrelloBoards from './Boards';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Boards = styled.div`
  display: flex;
  gap: 20px;
`;

function MainPage() {
  const [boardList, setBoardList] = useRecoilState(boardState);
  const onDragEnd: OnDragEndResponder = (result: DropResult) => {
    console.log(result, '<result');
    const { destination, source } = result;
    if (destination?.droppableId === source.droppableId) {
      setBoardList((args): any => {
        //1.전체 배열 복사
        const boardCopy = [...args];
        //2. 선택한 요소 복사
        const taskObj = boardCopy[source.index - 1];
        console.log(taskObj, '<taskObj');
        //3.전체 배열에서 source.index삭제하기
        boardCopy.splice(source.index - 1, 1);
        //4. 전체 배열에서 삭제한 인덱스 옮기려는 Index
        boardCopy.splice(destination.index - 1, 0, taskObj);
        return boardCopy;
      });
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable droppableId="boards" type="boards" direction="horizontal">
            {(provided: DroppableProvided) => (
              <Boards ref={provided.innerRef} {...provided.droppableProps}>
                {boardList.map((item, idx) => {
                  return (
                    <TrelloBoards
                      boardId={item.boardId}
                      key={item.boardId}
                      index={item.id.toString()}
                    />
                  );
                })}
                {/*  */}
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
