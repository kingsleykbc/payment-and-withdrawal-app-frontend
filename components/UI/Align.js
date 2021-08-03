import React from 'react';

const Align = ({ alignment, padding, responsivePadding, responsiveWidth, responsiveAlignment, children }) => {
  return (
    <div>
      {children}

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        div {
          text-align: ${alignment || "center"};
          padding: ${padding || "0"};
        }

        @media screen ${`and`} (max-width: ${responsiveWidth || "800px"}){
          div {
            text-align: ${responsiveAlignment || alignment || "center"};
            padding: ${responsivePadding || padding || "0"};
          }
        }
      `}</style>
    </div>
  );
};

export default Align;