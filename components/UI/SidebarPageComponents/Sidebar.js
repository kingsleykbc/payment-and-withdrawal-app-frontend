import React, { useState, useEffect, Fragment } from 'react';
import IcMenu from 'react-icons/lib/md/dehaze';
import ClickableIcon from '../ClickableIcon';
import theme from '../../../config/theme';
import useWindowSize from '../../../hooks/useWindowSize';


const Sidebar = ({
  children,
  padding,
  width,
  height,
  fixedHeight,
  topSpacing,
  mobileWidth,
  hasBorder,
  background,
  responsiveWidth,
  toggleButton,
  showToggleButton,
  collapseOnlyResponsive,
  mobileMarginTop,
  show,
  toggle
}) => {
  const { height: windowHeight } = useWindowSize();
  const defaultClass = (show || (!show && show !== false)) ? "show" : "hide";

  const [displayClass, setdisplayClass] = useState(defaultClass);
  useEffect(() => { setdisplayClass(defaultClass); }, [show]);

  const handleToggle = () => {
    if (toggle) toggle();
    else setdisplayClass(displayClass === "hide" ? "show" : "hide");
  }

  topSpacing = topSpacing || "60px";
  padding = padding || "10px";
  background = background || theme.colors.highlightColor;
  width = width || "270px";
  mobileWidth = mobileWidth || "100%";
  height = height || `calc(${windowHeight} - ${topSpacing})`;
  toggleButton = toggleButton || <ClickableIcon background={theme.colors.backgroundColor} size="40px" hasShadow icon={<IcMenu />} />;
  mobileMarginTop = mobileMarginTop ? mobileMarginTop : (showToggleButton !== false) ? "45px" : "0";
  const borderRight = (hasBorder) ? `1px solid ${theme.colors.borderColor}` : "none";
  const toggleButtonDisplayClass = collapseOnlyResponsive ? "none" : "inline-block";
  const marginLeft = collapseOnlyResponsive ? "0" : `-${width}`;

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <>
      {(showToggleButton !== false) && <div onClick={handleToggle} className="toggleButton small">{toggleButton}</div>}
      <aside className={`Sidebar ${displayClass}`}>
        {(showToggleButton !== false) && <div onClick={handleToggle} className="toggleButton large">{toggleButton}</div>}
        <div className="sidebarContent"> {children} </div>
      </aside>

      { /* STYLE */}
      <style jsx>{`
        .Sidebar {          
          flex-shrink: 0;
          background: ${background};
          min-height: ${height};
          border-right: ${borderRight};
          height: 100%;
          position: sticky;
          top: ${topSpacing};
          z-index: 1000;
        }

        .toggleButton {
          display: ${toggleButtonDisplayClass};
          position: absolute;
          right: -55px;
          top: 10px;
        }

        .sidebarContent {
          height: ${fixedHeight ? height : "auto"};
          margin-left: 0;
          padding: ${padding};
          width: ${width};
          transition: margin ease-out 0.2s;
        }

        .hide .sidebarContent {
          margin-left: ${marginLeft};
          overflow: hidden;
        }

        .small { display: none; }
        .large { display: block; }

        @media screen ${`and`} (max-width: ${responsiveWidth || "800px"}){
          .Sidebar {
            position: fixed;
            top: ${topSpacing};
            bottom: 0;
            width: ${mobileWidth};
            max-width: 100%;
            overflow: auto;
            box-shadow: ${theme.boxShadows.largeShadow};
            transition: all linear 0.2s;
          }

          .sidebarContent {
            margin-left: 0 !important;
            padding-top: ${mobileMarginTop};
            width: auto !important;
          }

          .Sidebar.show {
            margin-left: -100%;
          }

          .Sidebar.hide {
            margin-left: 0;
          }

          .toggleButton {
            display: inline-block;
            width: 50px;
            position: fixed;
            left: 10px;
            z-index: 10000;
            top: calc(${topSpacing} + 10px);
          }

          .small { display: ${`block`} }          
          .large { display: none }
        }
      `}</style>
    </>
  );
}


export default Sidebar;


// import React, { useState, useEffect, Fragment } from 'react';
// import IcMenu from 'react-icons/lib/md/dehaze';
// import ClickableIcon from '../ClickableIcon';
// import theme from '../../../config/theme';
// const { colors } = theme;

// const Sidebar = ({
//   children,
//   padding,
//   width,
//   height,
//   topSpacing,
//   mobileWidth,
//   hasBorder,
//   background,
//   responsiveWidth,
//   toggleButton,
//   showToggleButton,
//   collapseOnlyResponsive,
//   show,
//   toggle
// }) => {
//   const defaultClass = (show || (!show && show !== false)) ? "show" : "hide";
//   const [displayClass, setdisplayClass] = useState(defaultClass);
//   useEffect(() => { setdisplayClass(defaultClass); }, [show]);

//   // Toggle function
//   const handleToggle = () => {
//     if (toggle) toggle();
//     else setdisplayClass(displayClass === "hide" ? "show" : "hide");
//   }

//   /**
//    * SETUP CSS
//    */
//   padding = padding || "15px";
//   background = background || colors.highlightColor;
//   width = width || "270px";
//   height = height || `calc(100vh - ${topSpacing})`;
//   topSpacing = topSpacing || "60px";
//   mobileWidth = mobileWidth || "100%";
//   toggleButton = toggleButton || <ClickableIcon background={colors.backgroundColor} size="45px" hasShadow icon={<IcMenu />} />;
//   const borderRight = (hasBorder) ? `1px solid ${colors.borderColor}` : "none";
//   const mobileMarginTop = (showToggleButton !== false) ? "50px" : "0";
//   const toggleButtonDisplayClass = collapseOnlyResponsive ? "none" : "inline-block";
//   const marginLeft = collapseOnlyResponsive ? "0" : `-${width}`;

//   // =======================================================================
//   //  UI
//   // =======================================================================
//   return (
//     <aside className={`Sidebar ${displayClass}`}>
//       {(showToggleButton !== false) && <div onClick={handleToggle} className="toggleButton">{toggleButton}</div>}
      
//       <div className="sidebarContent"> {children} </div>

//       { /* STYLE ======================================================================================= */}
//       <style jsx>{`
//         .Sidebar {          
//           flex-shrink: 0;
//           background: ${background};
//           min-height: ${height};
//           border-right: ${borderRight};
//           height: 100%;
//           position: sticky;
//           top: ${topSpacing};
//           z-index: 2;
//         }

//         .toggleButton {
//           display: ${toggleButtonDisplayClass};
//           position: absolute;
//           right: -55px;
//           top: 10px;
//         }

//         .sidebarContent {
//           margin-left: 0;
//           padding: ${padding};
//           width: ${width};
//           transition: margin linear 0.2s;
//         }

//         .hide .sidebarContent {
//           margin-left: ${marginLeft};
//           overflow: hidden;
//         }

//         @media screen ${`and`} (max-width: ${responsiveWidth || "800px"}){
//           .Sidebar {
//             position: fixed;
//             top: ${topSpacing};
//             bottom: 0;
//             width: ${mobileWidth};
//             max-width: 100%;
//             overflow: auto;
//             box-shadow: ${theme.boxShadows.largeShadow};
//             transition: all linear 0.2s;
//           }

//           .sidebarContent {
//             margin-left: 0 !important;
//             margin-top: ${mobileMarginTop};
//             width: auto !important;
//           }

//           .Sidebar.show {
//             margin-left: -100%;
//           }

//           .Sidebar.hide {
//             margin-left: 0;
//           }

//           .toggleButton {
//             display: inline-block;
//             width: 50px;
//             position: fixed;
//             left: 10px;
//             top: calc(${topSpacing} + 10px);
//           }
//         }
//       `}</style>
//     </aside>
//   );
// }


// export default Sidebar;
