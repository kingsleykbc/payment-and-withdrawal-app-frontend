import React, { useEffect, useState } from 'react';
import Portal from './Portal';
import theme from '../../config/theme';
import ClickableIcon from './ClickableIcon';
import { Column, Flex } from './Flex';

const Drawer = ({ 
  toggle,
  show,
  children,
  size,
  responsiveSize,
  showCancelButton,
  direction,
  contentPadding,
  title,
  bottomActions,
  responsiveWidth,
  bottomActionsAlignment,
  behindHeader
}) => {

  /**
   * GET THE CSS
   */
  bottomActionsAlignment = (bottomActionsAlignment === "right")
    ? "flex-end"
    : (bottomActionsAlignment === "center") ? "center"
    : "flex-start";
  direction = direction || "right";
  size = size || "350px";
  responsiveSize = responsiveSize || size;
  contentPadding = contentPadding || "15px";
  const isHorizontal = direction == "right" || direction == "left";
  const adjacentValues = (isHorizontal) ? "top: 0; bottom: 0;" : "left: 0; right: 0;";
  const sizeAttr = (isHorizontal) ? "width" : "height";
  const closeIconTop = (behindHeader) ? "65px" : "10px";

  const [display, setDisplay] = useState("none");
  const [displayClass, setDisplayClass] = useState("hide");

  useEffect(() => {
    let timeOut;

    if (show){
      setDisplayClass("show");
      setDisplay("block");
    }
    else{
      setDisplayClass("hide");
      timeOut = setTimeout(() => setDisplay("none"), 200);
    }
    return () => clearTimeout(timeOut);
  }, [show]);

  return (
    <Portal selector="#portal">
      <div className="drawer">

        {/* DRAWER */}
        <div className={`drawerNav ${displayClass}`}>
          <Column stretchChildren fillHeight>

            {/* TITLE */}
            {title && <div className="title">{title}</div>}

            {/* CLOSE BUTTON */}
            {(showCancelButton !== false) &&
              <div className="closeIcon">
                <ClickableIcon
                  icon="&times;"
                  background={theme.colors.backgroundColor} 
                  hasShadow={true} 
                  onClick={toggle} 
                  fontSize="2.2rem" 
                  highlightBackground={false}
                />
              </div>
            }
            
            {/* MAIN CONTENT */}
            <Flex overflow="auto" span={1}>
              <div className="content">
                {children}
              </div>
            </Flex>

            {/* BOTTOM ACTIONS */}
            {(bottomActions && bottomActions.length > 0) &&
              <div className="bottomActions">
                {bottomActions.map(
                  (item, index) => <div key={`bottomAction_${index}`} className="bottomActionWidget">{item}</div>
                )}
              </div>
            }
          </Column>
        </div>

        {/* BACKDROP */}
        <div className={`backdrop ${displayClass}`} onClick={toggle}></div>

        { /* STYLE ======================================================================================= */}
        <style jsx>{`
          .title {
            padding: 18px;
            font-weight: bold;
            font-size: 1.1rem;
            border-bottom: 1px solid ${theme.colors.borderColor};
          }

          .drawer{            
            position: fixed;
            left:0;
            top:0;
            width:100%;
            display:${display};
            height: 100%;
            background: transparent;
            overflow: hidden;
            z-index: ${behindHeader ? 4 : 20};
          }

          .backdrop{
            position: absolute;
            top:0;
            left:0;
            right: 0;
            bottom: 0;
            opacity: 0;
            cursor: pointer;
            z-index: 3;
            background: ${theme.colors.tintColor};
          }
          .closeIcon {
            position: absolute;
            right: 10px;
            top: ${closeIconTop};
          }

          .backdrop.show{
            animation: fadeIn 0.2s 1 linear forwards;
          }
          .backdrop.hide{
            animation: fadeOut 0.2s 1 ${`linear`} forwards;
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes fadeOut {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }

          .drawerNav{
            position: fixed;
            ${adjacentValues}
            ${direction}:0;
            height: 100%;
            ${sizeAttr}: ${size};
            z-index: 4;
            background: ${theme.colors.backgroundColor};
            max-width: 100%;
            padding-top: ${behindHeader ? "70px" : "0"};
          }

          .drawerNav.show{
            animation: slideIn 0.2s 1 ${`linear`} forwards;
          }
          .drawerNav.hide{
            animation: slideOut 0.2s 1 ${`linear`} forwards;
          }

          @keyframes slideIn {
            0% {
              ${direction}: -${size};
            }
            100% {
              ${direction}: 0;
            }
          }

          @keyframes slideOut {
            0% {
              ${direction}: 0;
            }
            100% {
              ${direction}: -${size};
            }
          }

          .content {
            padding: ${contentPadding};
          }
          
          @media screen ${`and`} (max-width: ${responsiveWidth || "700px"}){
            .drawerNav{
              ${sizeAttr}: ${responsiveSize};
            }

            @keyframes slideIn {
              0% {
                ${direction}: -${responsiveSize};
              }
              100% {
                ${direction}: 0;
              }
            }

            @keyframes slideOut {
              0% {
                ${direction}: 0;
              }
              100% {
                ${direction}: -${responsiveSize};
              }
            }
          }  

          .bottomActions {
            border-top: 1px solid ${theme.colors.borderColor};
            display: flex;
            flex-wrap: wrap;
            justify-content: ${bottomActionsAlignment};
            padding: 10px;
          }
          
          .bottomActionWidget {
            padding: 5px;
          }
        `}</style>

      </div>
    </Portal>
  );
};

export default Drawer;