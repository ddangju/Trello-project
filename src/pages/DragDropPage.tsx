import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../store/atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
function DragDropPage() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd: OnDragEndResponder = ({
    destination,
    source,
  }: DropResult) => {
    //set으로 atom을 수정하는 방법은 두가지
    //1. 그냥 값을 보내는 방법
    //2. 인자로 보낸 다음 원하는 값으로 return받는 방법
    console.log(source.index);
    setToDos((arg) => {
      const copyToDos = [...arg];
      const test = copyToDos.splice(source.index, 1);
      console.log(test, "<testg");
      return [];
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <Draggable key={index} draggableId={toDo} index={index}>
                      {(magic) => (
                        <Card
                          ref={magic.innerRef}
                          {...magic.dragHandleProps}
                          {...magic.draggableProps}
                        >
                          {toDo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
      {/* <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="one">
            {(provider) => {
              return (
                <ul ref={provider.innerRef} {...provider.droppableProps}>
                  <Draggable draggableId="first" index={0}>
                    {(provider) => (
                      <li
                        ref={provider.innerRef}
                        {...provider.dragHandleProps}
                        {...provider.draggableProps}
                      >
                        1
                      </li>
                    )}
                  </Draggable>
                  <Draggable draggableId="second" index={1}>
                    {(provider) => (
                      <li
                        ref={provider.innerRef}
                        {...provider.dragHandleProps}
                        // {...provider.draggableProps}
                      >
                        2
                      </li>
                    )}
                  </Draggable>
                </ul>
              );
            }}
          </Droppable>
        </div>
      </DragDropContext> */}
    </>
  );
}

export default DragDropPage;
