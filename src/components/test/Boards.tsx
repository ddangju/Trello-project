import styled from 'styled-components';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { ITodo, boardState, toDoState } from '../../store/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { forwardRef } from 'react';
import Task from './Task';

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
            <Droppable
              direction="vertical"
              droppableId={props.boardId}
              type="task"
            >
              {(provided: DroppableProvided) => (
                <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                  {props.toDos.map((item, idx): any => (
                    <Task item={item} index={idx} key={idx} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Area>
        )}
      </Draggable>
    </>
  );
}
export default TrelloBoards;
