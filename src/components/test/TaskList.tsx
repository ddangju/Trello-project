import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  boardId: string;
}

interface IForm {
  toDo: string;
}

///1. todo를 입력하여 제출하는 폼
///2. 투두리스트의 요소
function TaskList(props: IBoardProps) {
  return <></>;
}

export default TaskList;
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
