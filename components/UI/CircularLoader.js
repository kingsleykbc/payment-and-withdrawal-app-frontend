import React from 'react';
import theme from '../../config/theme';

const CircularLoader = ({ size, color, color2, singleBorder }) => {
  size = size || "5.5rem";
  color = color || theme.colors.primaryColor;
  color2 = color2 || color;
  const borderSize = singleBorder ? "0.2em" : "0.3em";
  const borderStyle = singleBorder ? "solid" : "double";

  return (
    <div className="CircularLoader">
      <div className='loader'></div>

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .CircularLoader{
          text-align:  center;
        }
              
        .loader {
          display: inline-block;
          width: 1em;
          height: 1em;
          font-size: ${size};
          vertical-align: middle;
          position: relative;
        }
        .loader:before, .loader:after {
          content: "";
          top: 0;
          display: block;
          width: 1em;
          height: 1em;
          position: absolute;
          border-width: ${borderSize};
          border-style: ${borderStyle};
          border-color: transparent;
          box-sizing: border-box;
          border-radius: 1em;
          animation: spin 1s infinite;
        }
        .loader:after {
          left: 0;
          border-left-color: ${color};
          border-top-color: ${color2};
        }
        .loader:before {
          right: 0;
          border-right-color: ${color};
          animation-delay: -0.25s;
          border-bottom-color: ${color2};

        }

        @keyframes spin {
          from {
            transform: rotate(360deg);
          }
        }

      `}</style>
    </div>
  );
};

export default CircularLoader;