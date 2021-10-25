import React, { useRef, useState } from "react";
import MemoItem from "./components/MemoItem";
import MemoList from "./components/MemoList";

import { connect, sendMsg } from "./websocket/websocket";
function App() {
  const nextId = useRef(0);
  const [memoTitle, setTitleInputs] = useState("");
  const [memocontents, setContentsInputs] = useState("");

  const onTitleChange = (e) => {
    setTitleInputs(e.target.value);
  };
  const onContentsChange = (e) => {
    setContentsInputs(e.target.value);
  };
  const onReset = () => {
    setContentsInputs("");
    setTitleInputs("");
  };

  const [memos, setMemos] = useState([]);

  const onReceivedPriorMemo = (count, memoTitle, memoContents) => {
    const memo = {
      id: count,
      memoTitle: memoTitle,
      memocontents: memoContents,
    };
    setMemos((memos) => {
      return [...memos, memo]; //이렇게 함수로 넘겨야 제대로 동기화 된다.
    });
    if (nextId.current <= memo.id) {
      nextId.current = memo.id + 1;
    }
  };

  const onCreate = () => {
    const memo = {
      id: nextId.current,
      memoTitle,
      memocontents,
    };

    if (memoTitle === "") return;
    if (memocontents === "") return;

    setMemos((memos) => {
      return [...memos, memo];
    });
    sendMsg(
      "1 " +
        memo.id.toString() +
        " " +
        memo.memoTitle.toString() +
        " " +
        memo.memocontents.toString()
    );

    onReset();
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열 생성
    // = user.id 가 id 인 것을 제거함
    setMemos(memos.filter((memo) => memo.id !== id));
    sendMsg("2 " + id.toString()); // 2 : 데이터 삭제 패킷 헤더
  };

  connect({ onReceivedPriorMemo });

  return (
    <>
      <MemoItem
        memoTitle={memoTitle}
        memocontents={memocontents}
        onTitleChange={onTitleChange}
        onContentsChange={onContentsChange}
        onCreate={onCreate}
      />
      <MemoList memos={memos} onRemove={onRemove} />
    </>
  );
}

export default App;
