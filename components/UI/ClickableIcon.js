import React from 'react';
import theme from '../../config/theme';

const ClickableIcon = (
  { icon, color, onClick, size, iconSize, background, hasBorder, hasShadow, borderColor, filled, highlightBackground }
) => {
  highlightBackground = !(highlightBackground === false);
  const mainColor = color || theme.colors.primaryColor;

  const mainBorderColor = borderColor ? borderColor : (filled) ? mainColor : theme.colors.borderColor;
  const border = hasBorder ? `2px solid ${mainBorderColor}` : "none";
  const iconBackground = filled ? mainColor : (background) ? background : "transparent";
  const iconColor = filled ? "#fff" : mainColor;
  size = size || "40px";

  return (
    <div className="ClickableIcon">
      <div className="iconCover" onClick={onClick}>{icon}</div>

      { /* STYLE */}
      <style jsx>{`
        .iconCover {
          border: ${border};
          border-radius: 5px;
          width: ${size};
          height: ${size};
          align-items: center;
          display: inline-flex;
          color: ${iconColor};
          overflow: hidden;
          justify-content: center;
          cursor: pointer;
          font-size: ${iconSize || "1.5rem"};
          background: ${iconBackground};
          box-shadow: ${hasShadow ? theme.boxShadows.medShadow : "none"};
          transition: background linear 0.3s;
        }
        
        .iconCover :global(svg *){
          fill: ${iconColor};
        }

        .iconCover:hover{
          background: ${highlightBackground ? "#000" : "transparent" };
          color: ${highlightBackground ? "#fff" : "#000" };
          border-color: #000;
        }

        .iconCover:hover :global(svg *){
          fill: ${highlightBackground ? "#fff" : "#000" };
        }
      `}</style>
    </div>
  );
};

export default ClickableIcon;