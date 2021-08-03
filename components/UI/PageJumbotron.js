import React from 'react';

const PageJumbotron = ({ title, image, height, mobileHeight, responsiveWidth }) => {
  height = height || "200px";
  mobileHeight = mobileHeight || height;

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="PageJumbotron">
      <h1>{title}</h1>

      { /* STYLE */}
      <style jsx>{`
        .PageJumbotron{
          height: ${height};
          display:flex;
          align-items:center;
          justify-content: center;
          padding-bottom: 10px;
          font-weight: bold;
          background-color: rgba(34, 33, 80, 0.452);
        }

        h1 {
          color: #fff;
        }

        @media screen and (max-width: ${responsiveWidth || "800px"}){
          .PageJumbotron {  
            height: ${mobileHeight};
          }
        }
      `}</style>
    </div>
  );
};

export default PageJumbotron;