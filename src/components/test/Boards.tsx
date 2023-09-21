import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  DroppableProvided,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITodo, boardState, toDoSelector, toDoState } from "../../store/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { forwardRef } from "react";
import Task from "./Task";
import useSetBoard from "../../hooks/useSetBoard";

const TaskList = styled.div`
  background-color: #68faca;
`;

const Area = styled.div`
  width: 300px;
  min-height: 300px;
  background-color: ${(props) => props.theme.boardColor};
  background-color: #e1cdff;
  border-radius: 5px;
  height: min-content;

  padding: 10px;
  transition: background-color 0.3s ease-in-out;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
const Form = styled.form``;
interface IBoard {
  index: number;
  boardId: string;
  toDos: string[];
  onDragEnd: OnDragEndResponder;
}
interface IForm {
  toDo: string;
}
function TrelloBoards(props: IBoard) {
  const [boardList, setBoardList] = useRecoilState(boardState);
  const [toDos, setTodos] = useRecoilState(toDoSelector);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onToDoSubmit: SubmitHandler<IForm> = (value) => {
    setTodos({ value, props });
    // console.log(toDos, "<?");
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
    setValue("toDo", "");
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
            <Form onSubmit={handleSubmit(onToDoSubmit)}>
              <input {...register("toDo", { required: true })} type="text" />
              <button>submit</button>
            </Form>
            {/* <DragDropContext onDragEnd={onDragEnd}> */}
            <Droppable
              direction="vertical"
              droppableId={props.boardId}
              type="task"
            >
              {(provided: DroppableProvided) => (
                <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                  {props.toDos.map((item, idx) => (
                    <Task
                      item={item}
                      index={idx}
                      key={idx + item}
                      borderId={props.boardId}
                    />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
            {/* </DragDropContext> */}
          </Area>
        )}
      </Draggable>
    </>
  );
}
export default TrelloBoards;

///react의 key
//
