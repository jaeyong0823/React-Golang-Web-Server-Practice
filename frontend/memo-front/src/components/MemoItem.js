import React from "react";
import PropTypes from "prop-types";
function MemoItem({
  memoTitle,
  memocontents,
  onTitleChange,
  onContentsChange,
  onCreate,
}) {
  return (
    <div>
      <input
        memoTitle="memoTitle"
        placeholder="제목"
        onChange={onTitleChange}
        value={memoTitle}
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

MemoItem.propTypes = {
  memoTitle: PropTypes.string.isRequired,
  memocontents: PropTypes.string.isRequired,
  onTitleChange: PropTypes.any.isRequired,
  onContentsChange: PropTypes.any.isRequired,
  onCreate: PropTypes.any.isRequired,
};

export default MemoItem;
