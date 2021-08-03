import React from 'react';
import Button from './Button';

const FabButton = props => {
  return (
    <div className="FabButton">
      <Button {...props} />

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .FabButton {
          position: fixed;
          bottom: 40px;
          right: 40px;
          z-index: 5;
        }
      `}</style>
    </div>
  );
};

export default FabButton;