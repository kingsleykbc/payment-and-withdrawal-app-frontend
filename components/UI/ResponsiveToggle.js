import React, { Fragment } from 'react';

const ResponsiveToggle = ({large, small, maxWidth}) => {
  return (
    <>
      <div className="large">{large}</div>
      <div className="small">{small}</div>
      
      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .ResponsiveToggle {
          flex-grow: 1;
        }

        .small {
          display: none;
        }

        .large {
          display: block;
        }

        @media screen and (max-width: ${maxWidth || "800px"}){
          .small{
            display: block;
          }

          .large{
            display: ${`none`} !important;
          }
        }        
      `}</style>
    </>
  );
};

export default ResponsiveToggle;