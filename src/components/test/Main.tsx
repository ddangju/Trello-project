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
import BoardsComponents from '../Board';
import TrelloBoards from './Boards';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100vh;
`;

function MainPage() {
  const[boardList,setBoardList] = useRecoilState(boardState)
  const onDragEnd: OnDragEndResponder = (result:DropResult) => {
    console.log(result)

  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>;
      {boardList.map((item)=>{
        return(
          <Wrapper key={item.id}>
            <Droppable droppableId={item.id.toString()}>
                {(provided: DroppableProvided) => (
                  <TrelloBoards
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    boardId={item.id}
                    toDo={item.text}
                  />
                )}
            </Droppable>
          </Wrapper>
        )
      })}

      </DragDropContext>
    </>
  );
}

export default MainPage;
