import styled from "styled-components";
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { ITodo, boardState, toDoState } from "../../store/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { forwardRef } from "react";
import TaskList from "./TaskList";
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  boardId: string;
  toDos: ITodo[];
}
const Boards = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #dadfe9;
  border-radius: 5px;
`;

const Area = styled.div`
  width: 300px;
  min-height: 300px;
  background-color: ${(props) => props.theme.boardColor};
  background-color: #e1cdff;
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Board = styled.div``;
interface IForm {
  index: number;
  boardId: string;
  toDos: string[];
}

function TrelloBoards(props: IForm) {
  const [boardList, setBoardList] = useRecoilState(boardState);
  return (
    <>
      <Draggable draggableId={props.boardId} index={props.index}>
        {(provied) => (
          <Area
            ref={provied.innerRef}
            {...provied.draggableProps}
            {...provied.dragHandleProps}
          >
            <Title>{props.boardId}</Title>
            <Droppable droppableId={props.boardId} type="task">
              {(provided) => (
                <Board {...provided.droppableProps} ref={provided.innerRef}>
                  {/* {props.toDos.map((item)=>(
                  <TaskList item={item}/>
                  ))} */}
                  {/* {Object.keys(boardList).map((boardId): any => {
                    const toDos = boardList[parseInt(boardId)];
                    // console.log(toDos, "<toDos");
                    return;
                  })} */}
                </Board>
              )}
            </Droppable>
          </Area>
        )}
      </Draggable>
    </>
  );
}
export default TrelloBoards;

///DroppableId 값과 DraggableId값이 고유해야하는이유?
