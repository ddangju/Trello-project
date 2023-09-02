import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from '../components/DraggableCard';

const Boards = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #dadfe9;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IBoardProps {
  boardId: string;
  toDos: string[];
}
function BoardsComponents(props: IBoardProps) {
  return (
    <>
      <Boards>
        <Title>{props.boardId}</Title>
        <Droppable droppableId={props.boardId}>
          {(magic) => (
            <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
              {props.toDos.map((toDo, index) => (
                <DraggableCard key={toDo} index={index} toDo={toDo} />
              ))}
              {magic.placeholder}
            </Wrapper>
          )}
        </Droppable>
      </Boards>
    </>
  );
}
export default BoardsComponents;
