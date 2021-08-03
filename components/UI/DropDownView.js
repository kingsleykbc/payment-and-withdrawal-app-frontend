import React, { useState, useEffect } from 'react';
import theme from '../../config/theme';
import IcDown from 'react-icons/lib/md/keyboard-arrow-down';

const DropDownView = ({
  view, dropView, initialShow, trigger, origin, padding, viewPadding, width, closeOnDropViewClick, arrowIcon,
  highlightOnHover, matchWidth, showArrow, arrowColor, dropdownWidth, hasBackdrop, dropDownHeight
}) => {

  /**
   * GET CSS VALUES
   */
  trigger = trigger || "click";
  padding = padding || "0 10px";
  viewPadding = viewPadding || "10px";
  origin = origin || "bottom-left";
  const overflowY = dropDownHeight ? "auto" : "visible";
  dropDownHeight = dropDownHeight || "auto";

  arrowColor = arrowColor || theme.colors.lightText;
  width = width || "auto";
  const hoverBg = (highlightOnHover !== false) ? `${theme.colors.highlightColor}` : "none";

  // Set the position of the dropdown
  let positionConfig = `top: 100%; right:0;`;
  switch (origin) {
    case "bottom-left": positionConfig = "top: 100%; left: 0;"; break;
    case "bottom-right": positionConfig = `top: 100%; right:0;`; break;
    case "top-left": positionConfig = "bottom: 100%; left: 0;"; break;
    case "top-right": positionConfig = "bottom: 100%; right: 0;"; break;
  }

  /**
   * HANDLE TOGGLE ANIMATION
   */
  const [display, setDisplay] = useState("none");
  const [displayClass, setDisplayClass] = useState("hide");
  const [show, setShow] = useState(initialShow);
  const toggle = () => setShow(!show);

  useEffect(() => {
    let timeOut;
    if (show) {
      setDisplayClass("show");
      setDisplay("block");
    }
    else {
      setDisplayClass("hide");
      timeOut = setTimeout(() => setDisplay("none"), 200);
    }
    return () => clearTimeout(timeOut);
  }, [show]);

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="DropDownView">

      {/* VISIBLE VIEW */}
      <div className="view" onClick={trigger === "click" ? toggle : undefined} onMouseEnter={trigger === "hover" ? toggle : undefined}>
        {view}

        {/* ARROW ICON */}
        {showArrow !== false && <div className={`dropIcon ${displayClass}`}> {arrowIcon || <IcDown />}</div>}
      </div>

      {/* DROPDOWN VIEW */}
      {dropView &&
        <div className={`dropView ${displayClass}`}>
          <div onClick={closeOnDropViewClick && toggle}> {dropView}</div>
          {trigger === "hover" && <div className="safeArea"></div>}
        </div>
      }

      {/* BACKDROP */}
      {show &&
        <div
          className="back"
          onClick={trigger === "click" ? toggle : undefined}
          onMouseEnter={trigger === "hover" ? toggle : undefined}>
        </div>
      }

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .DropDownView{
          position: relative;
          display: inline-flex;
          z-index: 5;
          width: ${width};
        }

        .view{
          position: relative;
          min-width: 100px;
          padding: ${padding};
          min-height: 40px;
          cursor: pointer;
          justify-content: space-between;
          align-items: center;
          display: flex;
          width: 100%;
          z-index: 3;
          border-radius: 5px;
          transition: ${`background-color linear 0.25s`};
        }

        .view :hover {
          background: ${hoverBg};
        }

        .dropIcon{
          margin-left: 10px;
          font-size: 1.5em;
          display: inline-flex;          
        }

        .dropIcon :global(svg *){
          fill: ${arrowColor};
        }

        .dropIcon.show :global(svg){
          transition: transform ${`linear`} 0.2s;
          transform: rotate(180deg);
        }

        .dropIcon.hide :global(svg){
          transition: transform ${`linear`} 0.2s;
          transform: rotate(0deg);
        }

        .safeArea{
          z-index: -1;
          position: absolute;
          left: -20px;
          right: -20px;
          top: -20px;
          bottom: -20px;
        }

        .back {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 2;
          right: 0;
          bottom: 0;
          background: ${(hasBackdrop) ? theme.colors.tintColor : "none"};
        }

        .dropView {
          display: ${display};
          position: absolute;
          z-index: 10;
          padding: ${viewPadding};
          width:auto;
          ${positionConfig}
          border-radius: 3px;
          background: ${theme.colors.backgroundColor};
          box-shadow: ${theme.boxShadows.medShadow};
          width: ${`${matchWidth ? "100%" : (dropdownWidth) ? dropdownWidth : "200px"}`};
          max-height: ${dropDownHeight};
          overflow-y: ${overflowY};
        }
        
        .dropView.show{
          animation: fadeIn 0.2s 1 linear forwards;
        }

        .dropView.hide{
          animation: fadeOut 0.2s 1 ${`linear`} forwards;          
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }

          100% {
            opacity: 0;
            transform: scale(0.7);
          }
        }
      `}</style>
    </div>
  );
};



export default DropDownView;