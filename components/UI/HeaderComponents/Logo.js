import React from 'react';

const Logo = ({ children }) => {


  return (
    <div className="Logo">
      {children}

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .Logo {
          display: inline-flex;
          align-items: center;
          font-weight: bold;
        }
        
        @media screen and (max-width: 800px){
          .Logo {
            flex-grow: 1 !important;
            width: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Logo;


