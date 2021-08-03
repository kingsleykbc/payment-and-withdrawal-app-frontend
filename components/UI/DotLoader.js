import React from 'react';
import theme from '../../config/theme';

const DotLoader = ({ color, dotSize, direction }) => {
  dotSize= dotSize || "20px";
  color = color || theme.colors.primaryColor;

  return (
    <div className="DotLoader">
      <div className="dot"><span></span></div>
      <div className="dot"><span></span></div>
      <div className="dot"><span></span></div>

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .DotLoader{
          display: inline-flex;
          justify-content: center;
          align-items:center;
          flex-direction: ${direction || "row"};
          overflow: hidden;
        }

        .dot{
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 3px;
          width: ${dotSize};
          height: ${dotSize};
          overflow: hidden;
          border: 1px solid transparent;
        }

        span {
          display:inline-block;
          width: 100%;
          height: 100%;
          background: ${color};
          border-radius:50%;

          animation-name: blink;
          animation-duration: 1.2s;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }

        .dot:nth-child(2) span {
          animation-delay: .2s;
        }
        .dot:nth-child(3)  span {
          animation-delay: .3s;
        }

        @keyframes blink {
          0% {
            opacity: .3;
            width: 90%;
            height: 90%;
          }
          50% {
            opacity: 1;
            width: 100%;
            height: 100%;
          }
          100% {
            opacity: .3;
            width: 90%;
            height: 90%;
          }
        }
      `}</style>
    </div>
  );
}
export default DotLoader; 