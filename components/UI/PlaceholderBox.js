import React from 'react';
import theme from '../../config/theme';

const PlaceholderBox = ({ width, height, children, fontSize, margin, padding }) => {
  width = width || "auto";
  height = height || "200px";
  margin = margin || "0";
  padding = padding || "0";
  fontSize = fontSize || "1.1rem";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="PlaceholderBox">
      <h3 style={{ color: theme.colors.lightText, fontSize }}>{children}</h3>

      { /* STYLE */}
      <style jsx>{`
        .PlaceholderBox {
          text-align: center;
          border: 2px dashed ${theme.colors.borderColor};
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 10px;
          width: ${width};
          height: ${height};
          margin: ${margin};
          padding: ${padding};
        }
      `}</style>
    </div>
  );
};

export default PlaceholderBox;