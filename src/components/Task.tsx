import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { boardState } from "../state/boards";

interface IBoardProps {
  item: string;
  index: number;
  borderId: string;
}
const Card = styled.div`
  padding: 10px;
  border-radius: 5px;
  font-weight: 600;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  background-color: #ffffff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

function Board(props: IBoardProps) {
  const setBoardList = useSetRecoilState(boardState);
  const onDeleteToDo = () => {
    setBoardList((prev) => {
      const targetBoardIndex = prev.findIndex(
        (item) => item.boardId === props.borderId
      );
      const boardCopy = [...prev];
      const targetTaskCopy = boardCopy[targetBoardIndex];
      const targetToDos = [...targetTaskCopy.toDos];
      const newToDo = targetToDos.filter((todo) => todo !== props.item);
      boardCopy[targetBoardIndex] = {
        ...targetTaskCopy,
        toDos: newToDo,
      };
      return boardCopy;
    });
  };

  return (
    <>
      <Draggable draggableId={props.item} index={props.index}>
        {(provided) => (
          <Wrapper>
            <Card
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              {props.item}
            </Card>
            <button onClick={onDeleteToDo}>DELETE</button>
          </Wrapper>
        )}
      </Draggable>
    </>
  );
}

export default Board;
