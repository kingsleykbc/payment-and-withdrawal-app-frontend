import React from 'react';
import theme from '../../config/theme';

const PageDivider = ({ label, children, fontSize, edgeSpacing, labelPosition, vPadding,  borderWidth, borderColor }) => {

  /**
   * GET CSS
   */
  edgeSpacing = edgeSpacing || "20px";
  label = label || children
  fontSize = fontSize || "1rem";

  const left = (labelPosition === "center") 
    ? "calc(50% - 10px)" 
    : (labelPosition === "right") ? "auto" 
    : edgeSpacing;
  const right = (labelPosition === "right") 
    ? edgeSpacing 
    : "auto";


  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="PageDivider"> 
      {label && <h4 className="label">{label}</h4>}
      <hr/>

      { /* STYLE */}
      <style jsx>{`
        .PageDivider{
          position: relative;
          padding: ${vPadding || "22px"} 0;
        }
        
        .label{
          position: absolute;
          top: calc(50% - 10px);
          display: inline-block;
          padding: 0 10px;
          background: #fff;
          font-size: ${fontSize};
          left: ${left};
          right: ${right};
          color: ${theme.colors.lightText}
        }

        .PageDivider :global(hr){
          border-width: ${borderWidth || "1px"};
          ${borderColor || `border-color: ${borderColor};`}
        }

      `}</style>
    </div>
  );
};

export default PageDivider;