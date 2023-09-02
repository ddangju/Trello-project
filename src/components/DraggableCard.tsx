import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
interface IDragabbleCardProps {
  toDo: string;
  index: number;
}
function DraggableCard(props: IDragabbleCardProps) {
  return (
    <>
      <Draggable key={props.toDo} draggableId={props.toDo} index={props.index}>
        {(magic) => (
          <Card
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            {props.toDo}
          </Card>
        )}
      </Draggable>
    </>
  );
}

export default React.memo(DraggableCard);

///props로 값을 받을때 확인해야하는 부분
//1. props로 받을 타입 설정하기

///???
//1. 부모에서 ㅔrops를 보내지도 않앗는데 타입을 설정하면 자동완성이 됨...
