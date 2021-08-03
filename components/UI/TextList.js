import React from 'react';

const TextList = ({ items = [], listStyle, isInside, vMargin }) => {
  listStyle = listStyle || "disc";
  const listPosition = isInside !== false ? "inside" : "outside";
  vMargin = vMargin || "12px";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <ol className="TextList">
      {items.map((item, index) => <li key={`${item}_${index}`}>{item}</li>)}

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        li {
          list-style-type: ${listStyle} !important;
          list-style-position: ${listPosition} !important;
          margin: ${vMargin} 0;
        }
      `}</style>
    </ol>
  );
};

export default TextList;