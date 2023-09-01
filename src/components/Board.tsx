import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from '../components/DraggableCard';
import { useForm } from 'react-hook-form';
import { ITodo } from '../store/atoms';
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
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  overflow: hidden;
  min-height: 300px;
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
interface IForm {
  toDo: string;
}
function BoardsComponents(props: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setValue('toDo', '');
    // setValue('toDo', '');
  };
  return (
    <>
      <Boards>
        <Title>{props.boardId}</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register('toDo', { required: true })}
            type="text"
            placeholder={`Add task on ${props.boardId}`}
          />
        </Form>
        <Droppable droppableId={props.boardId}>
          {(magic, snapShot) => (
            <Area
              // isDraggingOver={snapShot.isDraggingOver}
              // isDraggingFromThis={Boolean(snapShot.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {props.toDos.map((toDo, index) => (
                <DraggableCard
                  key={toDo.id}
                  index={index}
                  toDoId={toDo.id}
                  toDoText={toDo.text}
                />
              ))}
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
      </Boards>
    </>
  );
}
export default BoardsComponents;
///isDraggingOver : board위로 드래그해서 들어고고 있는지 확인
///draggingFromThisWith : 현재 droppable에서 벗어낫는지
///isDragging
// const Area = styled.div<IAreaProps>`
//   width: 300px;
//   padding: 20px 10px;
//   padding-top: 10px;
//   background-color: ${(props) => props.theme.boardColor};
//   border-radius: 5px;
//   overflow: hidden;
//   min-height: 300px;
//   background-color: ${(props) =>
//     ///board위로 드래그를 해서 들어오고 있는찌? false면 해당 board로부터 드래깅을 시작했다면 해당 board는 red, 아니라면 blue
//     props.isDraggingOver
//       ? '#dfe6e9'
//       : props.isDraggingFromThis
//       ? '#b2bec3'
//       : 'transparent'};
//   flex-grow: 1;
//   transition: background-color 0.3s ease-in-out;
//   padding: 20px;
// `;
