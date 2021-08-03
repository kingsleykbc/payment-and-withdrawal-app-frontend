import React from 'react';
import theme from '../../config/theme';
import IcHelp from 'react-icons/lib/md/help';

const Tooltip = ({ label, color, width, children, highlight, position }) => {

  /**
   * GET CSS
   */
  color = color || "rgba(0, 0, 0, 0.685)";
  width = width || "auto";

  /**
   * GET THE ARROW STYLE
   */
  const bottomArrow = `
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-color: ${color} transparent transparent transparent;
  `;
  const topArrow = `
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-color:  transparent transparent ${color} transparent;
  `;
  const leftArrow = `
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-color:  transparent ${color} transparent transparent;
  `;
  const rightArrow = `
    top: 50%;
    left: 100%; 
    margin-top: -5px;
    border-color:  transparent transparent transparent ${color};
  `;

  const arrowStyle = (position === "left")
    ? rightArrow
    : (position === "right") ? leftArrow
      : (position === "bottom") ? topArrow
        : bottomArrow;

  /**
   * GET THE POSITIONING
   */
  const topTip = `
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
  `;

  const bottomTip = `
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
  `;

  const rightTip = `
    top: -5px;
    left: calc(100% + 10px);
  `;

  const leftTip = `
    top: -5px;
    right: calc(100% + 10px);
  `;

  const tipPosition = (position === "left")
    ? leftTip
    : (position === "right") ? rightTip
      : (position === "bottom") ? bottomTip
        : topTip;

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <span className="Tooltip">
      <span className="toolTipText">{label}</span>
      {children || <IcHelp />}

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .Tooltip {
          position: relative;
          display: inline-block;
          cursor: help;
          ${(highlight !== false) && `color: ${theme.colors.primaryColor}`};
          ${(highlight !== false) && `font-weight: bold`};
        }

        .Tooltip .toolTipText {
          visibility: hidden;
          display: block;
          background-color:${color};
          color: #fff;
          text-align: center;
          border-radius: 5px;
          padding: 5px 15px;
          width: ${width};
          position: absolute;
          z-index: 1;
          font-size: 0.9em;
          font-weight: bold;
          ${tipPosition}
          opacity: 0;
          transition: opacity 0.3s;
        }

        .Tooltip .toolTipText::after {
          content: "";
          position: absolute;
          ${arrowStyle};
          border-width: 5px;
          border-style: solid;
        }

        .Tooltip:hover .toolTipText {
          visibility: visible;
          opacity: 1;
        }

        .Tooltip :global(svg) {
          font-size: 1.2rem;
        }
        .Tooltip :global(svg *) {
          fill: ${theme.colors.lightText};
        }

      `}</style>
    </span>
  );
};
export default Tooltip;