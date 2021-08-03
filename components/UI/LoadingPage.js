import React from 'react';
import DotLoader from './DotLoader';
import ResultPage from './ResultPage';

const LoadingPage = ({ isFullScreen = true }) => {
  const dotSize = isFullScreen ? "30px" : "20px";
  const height = isFullScreen ? "80vh" : "180px";

  // ================================================================================================
  //  UI
  // ================================================================================================
  return (
    <div className="LoadingPage">
      <ResultPage
        type="loading"
        icon={<DotLoader dotSize={dotSize} />}
      />

      <style jsx>{`
        .LoadingPage {
          height: ${height};
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 10%;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;