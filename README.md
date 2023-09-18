# ✨let try using Trello

- React
- react-beautiful-dnd
- Recoil

---

## findIndex와 find 이슈

### 이전의 코드

```js
    if (destination && type === 'task') {
      if (destination.droppableId === source.droppableId) {
        setBoardList((args): any => {
          //1. 전체 객체 복사
          const boardCopy = [...args];
          //2.target board 객체 찾기
          const targetBoard = args.find(
            (item) => item.boardId === destination.droppableId
          );
          // 3. 찾은 객체의 toDos를 얉은 복사 진행
          const targetBoardCopy = [...(targetBoard?.toDos as any)];
          // 4. 이동시키려고 하는 task를 source.index 속성을 사용하여 taskObj에 할당
          const taskObj = targetBoardCopy[source.index];
          // 5. 이동 시키려는 task의 인덱스를 splice로 잘라내기
          targetBoardCopy.splice(source.index, 1);
          // 6. 4번에서 이동 시키려고 하는 task를 할당한 변수 taskObj를
          //이동하려고 하는 자리, destination.index 속성을 활용하여 합치기
          targetBoardCopy.splice(destination.index, 0, taskObj as string);
          //여기서 문제 발생.
          //위의 코드까지 console.log를 확인하였을때 원하는대로 task가 이동한 것을 확인하였다.
          return [...boardCopy, { ...targetBoard, toDos: targetBoardCopy }];

        });
      }
    }

```

6번까지 console.log로 확인하였을때 원하는대로 task가 이동한 것을 확인할 수 있었다.
업데이트된 값 `{boardId:'toDo', toDos:['sleep','eat']}`을 setState하기 위해서 방법을 찾았다
하지만 state는 아래의 구조였고 해당하는 `boardId`를 찾기 위해서는 filter메서드로 다시 비교를 해야하는 이슈가 발생했고 제대로 setState를 할 수가 없었다.

```js
  [
    { boardId: 'toDo', toDos: ['eat', 'sleep'] },
    { boardId: 'progress', toDos: ['work', 'running'] },
    { boardId: 'done', toDos: ['exercise', 'home'] },
  ],
```

### 변경한 코드

해결한 방법은 객체의 값을 가져오는 것이 아니라 `findIndex`메서드를 사용해서 해당하는 `index`를 가져오는 것이었다.

```js
if (destination && type === "task") {
  if (destination.droppableId === source.droppableId) {
    setBoardList((args): any => {
      //1.특정 index찾기
      const targetBoardIndex = args.findIndex(
        (item) => item.boardId === destination.droppableId
      );
      ///2. 전체 state복사
      const newState = [...args];
      ///3. 특정 index의 값을 가져오기
      const targetBoard = newState[targetBoardIndex];
      //4. 특정 index의 값의 toDos copy하기
      const newToDos = [...targetBoard.toDos];
      const [moveTask] = newToDos.splice(source.index, 1);
      newToDos.splice(destination.index, 0, moveTask);
      newState[targetBoardIndex] = {
        ...targetBoard,
        toDos: newToDos,
      };
      return newState;
    });
  }
}
```
