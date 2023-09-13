import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

interface IBoardProps {
  item: string;
  index: number;
}
const Card = styled.div`
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-weight: 600;
`;
function Task(props: IBoardProps) {
  return (
    <>
      <Draggable draggableId={props.item} index={props.index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {props.item}
          </Card>
        )}
      </Draggable>
    </>
  );
}

export default Task;
