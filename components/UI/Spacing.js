import React from 'react';

const Spacing = ({ padding, children, isInline, responsivePadding, responsiveWidth }) => {
  padding = padding || "5px";
  const display = isInline ? "inline-block" : "block"; 

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="Spacing">
      {children}
      
      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        div {
          padding: ${padding}; 
          display: ${display};
        }

        @media screen ${`and`} (max-width: ${responsiveWidth || "800px"}){
          div {padding: ${responsivePadding || padding}}
        }
      `}</style>
    </div>
  );
};

export default Spacing;