// import React from 'react';
// import styled from 'styled-components';
// import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
// import { ITodo } from '../store/atoms';

// interface IDragabbleCardProps {
//   toDoId: number;
//   toDoText: string;
//   index: number;
// }
// const Card = styled.div`
//   border-radius: 5px;
//   margin-bottom: 5px;
//   padding: 10px;
//   background-color: ${(props) => props.theme.cardColor};
// `;

// function DraggableCard(props: IDragabbleCardProps) {
//   return (
//     <>
//       <Draggable draggableId={props.toDoId + ''} index={props.index}>
//         {(magic) => (
//           <Card
//             // isDragging={snapshot.isDragging}
//             ref={magic.innerRef}
//             {...magic.dragHandleProps}
//             {...magic.draggableProps}
//           >
//             {props.toDoText}
//           </Card>
//         )}
//       </Draggable>
//     </>
//   );
// }

// export default React.memo(DraggableCard);

// ///props로 값을 받을때 확인해야하는 부분
// //1. props로 받을 타입 설정하기

// ///???
// //1. 부모에서 ㅔrops를 보내지도 않앗는데 타입을 설정하면 자동완성이 됨...
// //2. 컴포넌트에서 props를 보내면 styled component에서 받을 수 있다. props를 받을 때는 타입 지정이 필요하다
// ///// props을 받을때는 넘어오는 props의 이름으로 받기
// // const Card = styled.div<{ isDragging: boolean }>`
// //   border-radius: 5px;
// //   margin-bottom: 5px;
// //   padding: 10px;
// //   background-color: ${(props) =>
// //     props.isDragging ? '#91caff' : props.theme.cardColor};
// //   box-shadow: ${(props) =>
// //     props.isDragging ? '0px 2px 5px rgba(0, 0, 0, 0.05)' : 'none'};
// // `;
