import React from 'react';
function MemoItem({ memotitle, memocontents, onTitleChange,onContentsChange, onCreate }) {


    return (
        <div>
          <input
            memotitle="memotitle"
            placeholder="제목"
            onChange={onTitleChange}
            value={memotitle}
          />
          <input
            memocontents="memocontents"
            placeholder="내용"
            onChange={onContentsChange}
            value={memocontents}
          />
          <button onClick={onCreate}>추가</button>
        </div>
      );
    }


export default MemoItem;