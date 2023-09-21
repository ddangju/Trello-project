import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { boardState } from "../../store/atoms";
import useSetBoard from "../../hooks/useSetBoard";

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

function Task(props: IBoardProps) {
  const setBoardList = useSetRecoilState(boardState);
  const onDeleteToDo = (result: any) => {
    setBoardList((prev): any => {
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

export default Task;
