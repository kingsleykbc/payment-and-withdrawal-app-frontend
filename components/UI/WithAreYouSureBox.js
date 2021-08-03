import React, { useRef } from 'react';
import AreYouSureBox from './AreYouSureBox';

const WithAreYouSureBox = ({ children, onYes, message, title }) => {
  const areYouSureRef = useRef(null);

  /**
   * HANDLE CLICK
   */
  const handleClick = () => areYouSureRef.current.openAreYouSureBox({ title, message, onYes });

  // ================================================================================================
  //  UI
  // ================================================================================================
  return (
    <div onClick={handleClick}>
      {children}
      <AreYouSureBox ref={areYouSureRef} />

      { /* STYLE */}
      <style jsx>{` div { display: inline-block; } `}</style>
    </div>
  );
};

export default WithAreYouSureBox;