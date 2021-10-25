import React from "react";
import PropTypes from "prop-types";

function Memo({ memo, onRemove }) {
  return (
    <div>
      <b>{memo.memoTitle}</b> <span>{memo.memocontents}</span>
      <button onClick={() => onRemove(memo.id)}>삭제</button>
    </div>
  );
}

function MemoList({ memos, onRemove }) {
  return (
    <div>
      {memos.map((memo) => (
        <Memo memo={memo} key={memo.id} onRemove={onRemove} />
      ))}
    </div>
  );
}

MemoList.propTypes = {
  memos: PropTypes.any.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default MemoList;
