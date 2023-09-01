import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function DragDropPage() {
  const onDragEnd = () => {};

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
                        {...provider.draggableProps}
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
      </DragDropContext>
    </>
  );
}

export default DragDropPage;
