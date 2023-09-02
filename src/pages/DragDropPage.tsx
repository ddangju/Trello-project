import {
  DragDropContext,
  DropResult,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../store/atoms';
import BoardsComponents from '../components/Board';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100vh;
`;

function DragDropPage() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd: OnDragEndResponder = (result: DropResult) => {
    const { destination, draggableId, source } = result;
    if (destination?.droppableId === source.droppableId) {
      setToDos((arg) => {
        const boardCopy = [...arg[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return { ...arg, [source.droppableId]: boardCopy };
      });
      // setToDos((args) => {
      //   const toDoscopy = [...args[source.droppableId]];
      //   toDoscopy.splice(source.index, 1);
      //   toDoscopy.splice(destination.index, 0, draggableId);
      //   return toDoscopy;
      // });
    }
    //1.source 보드와 destination보드가 같은지 체크해야함.

    // console.log(source);
    // console.log(draggableId);
    // console.log(destination);
    // setToDos((args): any => {
    //   if (!destination) return;
    //   const toDosCopy = { ...args };
    //   // const test = toDosCopy[source.droppableId].splice(source.index, 1);
    //   console.log(toDosCopy[source.droppableId], '<Test');
    //   // toDosCopy[source.droppableId].splice(destination.index, 0, draggableId);
    //   // return toDosCopy;
    // });
    //set으로 atom을 수정하는 방법은 두가지
    //1. 그냥 값을 보내는 방법
    //2. 인자로 보낸 다음 원하는 값으로 return받는 방법
    ///destination이 없을때 => 사용자가 카드를 이동시키지 않을때
    // setToDos((arg) => {
    //   const toDosCopy = [...arg];
    //   toDosCopy.splice(source.index, 1);
    //   toDosCopy.splice(destination.index, 0, draggableId);
    //   return toDosCopy;
    // });
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          {toDos &&
            Object.keys(toDos).map((boardId) => (
              <BoardsComponents
                boardId={boardId}
                key={boardId}
                toDos={toDos[boardId]}
              />
            ))}
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default DragDropPage;

///놓친 부분
//객체 내부의 프로퍼티의 배열의 값이 변경된다면
//그 부분만 복사를 하면된다
//하지만 나는? 객체 전체를 복사를 시도했다...=> 이러한 이유로 splice가 되지 않았떤 것이 아닐까..?
//2. 복사를 한 프로퍼티 값만 returnㅎㅏ려고함..
/////다른 객체의 프로퍼티들은 바뀌질 않았으니 그 부분과 같이 합쳐서 return해줘야했다. => 어떻게 합치지?
/////이 부분은 꼭 명심하기!!!
