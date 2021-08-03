import React from 'react';
import Container from './Container';
import theme from '../../config/theme';

const SkeletonContainer = ({
  width,
  height,
  color,
  animate,
  borderRadius,
  ...ContainerProps
}) => {
  
  color = color || theme.colors.borderColor;
  width = width || "100%";
  height = height || "20px";
  borderRadius = borderRadius || "5px";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="SkeletonContainer">
      <Container 
        className="container"
        width={width} 
        height={height}  
        background={color}
        borderRadius={borderRadius}
        {...ContainerProps} 
      />

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .SkeletonContainer {
          overflow: auto;
          display: inline-block;
          width: ${width};
          max-width: 100% !important;
          overflow: hidden;
        }

        .SkeletonContainer :global(.container) {
          overflow: hidden;
          position: relative;
        }

        .SkeletonContainer :global(.container)::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
          animation: shimmer 2s infinite;
          content: ' ';
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonContainer;