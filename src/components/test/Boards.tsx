import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  DroppableProvided,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { ITodo, boardState, toDoState } from "../../store/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { forwardRef } from "react";
import Task from "./Task";

const TaskList = styled.div`
  background-color: #68faca;
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

interface IBoard {
  index: number;
  boardId: string;
  toDos: string[];
}

function TrelloBoards(props: IBoard) {
  const [boardList, setBoardList] = useRecoilState(boardState);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, type } = result;
    if (destination && type === "task") {
      if (destination.droppableId === source.droppableId) {
        setBoardList((prev) => {
          //1.특정 index찾기
          const targetBoardIndex = prev.findIndex(
            (item) => item.boardId === destination.droppableId
          );
          ///2. 전체 state복사
          const boardCopy = [...prev];
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
    }
  };

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
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                direction="vertical"
                droppableId={props.boardId}
                type="task"
              >
                {(provided: DroppableProvided) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {props.toDos.map((item, idx) => (
                      <Task item={item} index={idx} key={item} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            </DragDropContext>
          </Area>
        )}
      </Draggable>
    </>
  );
}
export default TrelloBoards;

///react의 key
//
