// import {
//   DragDropContext,
//   DropResult,
//   OnDragEndResponder,
// } from 'react-beautiful-dnd';
// import { useRecoilState } from 'recoil';
// import styled from 'styled-components';
// import { toDoState } from '../store/atoms';
// import BoardsComponents from '../components/Board';

// const Wrapper = styled.div`
//   display: flex;
//   width: 100vw;
//   margin: 0 auto;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   height: 100vh;
// `;

// function DragDropPage() {
//   const [toDos, setToDos] = useRecoilState(toDoState);
//   ///1. droppableId는 해당 카드의 id
//   // 2. toDos
//   const onDragEnd: OnDragEndResponder = (result: DropResult) => {
//     const { destination, source } = result;
//     if (destination?.droppableId === source.droppableId) {
//       setToDos((args): any => {
//         const boardCopy = [...args[source.droppableId]];
//         boardCopy.splice(source.index, 1);
//         const taskObj = boardCopy[source.index];
//         boardCopy.splice(destination?.index, 0, taskObj);
//       });
//     }
//     if (destination && destination?.droppableId !== source.droppableId) {
//       setToDos((arg) => {
//         //현재 위치 복사
//         const sourceBoard = [...arg[source.droppableId]];
//         sourceBoard.splice(source.index, 1);
//         //옮길 위치 복사
//         const taskObj = sourceBoard[source.index];
//         const targetBoard = [...arg[destination?.droppableId]];
//         targetBoard.splice(destination.index, 0, taskObj);
//         // con
//         return {
//           ...arg,
//           [source.droppableId]: sourceBoard,
//           [destination?.droppableId]: targetBoard,
//         };
//       });
//     }
//   };
//   return (
//     <>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Wrapper>
//           {toDos &&
//             Object.keys(toDos).map((boardId): any => {
//               return (
//                 <BoardsComponents
//                   boardId={boardId}
//                   key={boardId}
//                   toDos={toDos[boardId]}
//                 />
//               );
//             })}
//         </Wrapper>
//       </DragDropContext>
//     </>
//   );
// }

// export default DragDropPage;

// ///놓친 부분
// //객체 내부의 프로퍼티의 배열의 값이 변경된다면
// //그 부분만 복사를 하면된다
// //하지만 나는? 객체 전체를 복사를 시도했다...=> 이러한 이유로 splice가 되지 않았떤 것이 아닐까..?
// //2. 복사를 한 프로퍼티 값만 returnㅎㅏ려고함..
// /////다른 객체의 프로퍼티들은 바뀌질 않았으니 그 부분과 같이 합쳐서 return해줘야했다. => 어떻게 합치지?
// /////이 부분은 꼭 명심하기!!!

// ////객체로 변경하고 난 후
// /// object로 이루어져있는데 string을 넣으려고 했기 때문에 계속 컴파일 에러가 남
// // if (destination?.droppableId === source.droppableId) {
// //   setToDos((arg) => {
// //     const boardCopy = [...arg[source.droppableId]];
// //     boardCopy.splice(source.index, 1);
// //     boardCopy.splice(destination.index, 0, { text: '', id: 1 });
// //     return { ...arg, [source.droppableId]: boardCopy };
// //   });
// // }

// ///궁금한 부분
// ///  const onDragEnd: OnDragEndResponder = (result: DropResult) => {
// // toDos[result.source.droppableId].console.log();
// //   toDos[result.source.droppableId].findIndex((obj) => obj.id === result?.droppableId);
// // };
// //해당 코드를 작성하면 droppableId type이 존재하지 않다고 나온다 하지만 타입을 ㅏ타고 들어가면 존재함..뭐 어쩌라는거..
