import React, { useRef, useState } from 'react';
import MemoItem from './components/MemoItem';
import MemoList from './components/MemoList';

import WebSocket, {connect, sendMsg} from'./websocket/websocket';
function App() {

  connect();
   
  const [memotitle, setTitleInputs] = useState('');
  const [memocontents, setContentsInputs] = useState('');

  const onTitleChange = (e) => {
    setTitleInputs(e.target.value);
  };
  const onContentsChange= (e) =>{
    setContentsInputs(e.target.value);
  }


  const onReset = () => {
    setContentsInputs( '');
    setTitleInputs('');
  };

  const onRemove = id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열 생성
    // = user.id 가 id 인 것을 제거함
    setMemos(memos.filter(memo => memo.id !== id));
    sendMsg("2 " + id.toString());
    nextId.current -= 1;
  };
  const [memos, setMemos] = useState([]);

  const nextId = useRef(1);
  const onCreate = () => {
    const memo = {
      id: nextId.current,
      memotitle,
      memocontents
    };
    if (memotitle ==="")
        return;
    if (memocontents ==="")
        return;
    setMemos([...memos, memo]);
    sendMsg("1 " + memo.id.toString() + " " + memo.memotitle.toString() + " " + memo.memocontents.toString());
    onReset();
    nextId.current += 1;
  };
  return (
    <>
      <MemoItem
        memotitle={memotitle}
        memocontents={memocontents}
        onTitleChange={onTitleChange}
        onContentsChange= {onContentsChange}
        onCreate={onCreate}
 
      />
      <MemoList memos={memos} onRemove={onRemove} />
    </>
  );
}

export default App;