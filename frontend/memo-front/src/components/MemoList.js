import React from 'react';
function Memo({ memo,onRemove }) {
  return (
    <div>
        <b>{memo.memotitle}</b> <span>{memo.memocontents}</span>
        <button onClick={() => onRemove(memo.id)}>삭제</button>
    </div>
  );
}

function MemoList({memos,onRemove}){
  return (
    <div>
      {memos.map((memo) => (
        <Memo memo={memo} key={memo.id} onRemove={onRemove}/>
     
      ))}
        
    </div>
  );
}

export default MemoList;