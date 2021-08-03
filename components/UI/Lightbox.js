import React,{useState, useEffect} from 'react';
import classnames from 'classnames';
import Portal from './Portal';
import theme from '../../config/theme';
import ClickableIcon from './ClickableIcon';
import { Column, Flex } from './Flex';

const Lightbox = ({
  show,
  title,
  bottomActions,
  autoWidth,
  width,
  autoHeight,
  height,
  behindHeader,
  contentPadding,
  isFullScreen,
  toggle,
  onClose,
  isFixed,
  children,
  className: cName,
  showCancelButton,
  closeOnBackClick,
  fullScreenInResponsive,
  bottomActionsAlignment,
  responsiveWidth
}) => {

  const [display, setDisplay] = useState("none");
  const [displayClass, setDisplayClass] = useState("show");

  /**
   * CLOSE LIGHTBOX
   */
  const closeBox = () => {
    setDisplay("none");
    if (onClose) onClose();
  }
  
  /**
   * HANDLE TOGGLE CHANGE
   */
  useEffect(() => {
    let timeOut;

    if (show) {
      setDisplayClass("show");
      setDisplay("block");
    }
    else {
      setDisplayClass("hide");
      timeOut = setTimeout(closeBox, 250);
    }
    return () => clearTimeout(timeOut);
  }, [show]);

  /**
   * SETUP CSS
   */
  contentPadding = contentPadding || "15px";
  bottomActionsAlignment = (bottomActionsAlignment === "left")    
    ? "flex-start"
    : (bottomActionsAlignment === "center") ? "center"
    : "flex-end";

  const maxHeight = height ? height : (isFullScreen || autoHeight) ? "none" : "400px";
  const maxWidth = width ? width : (isFullScreen || autoWidth) ? "none" : "800px";
  const mainWidth = (isFullScreen) ? "100%" : (autoWidth) ? "auto" :"90%";
  const mainHeight = (isFullScreen) ? "100%" : (autoHeight) ? "auto" : "90%";
  const borderRadius = (isFullScreen) ? "0" : "5px";

  const mobileMaxWidth = fullScreenInResponsive ? "none" : maxWidth;
  const mobileMaxHeight = fullScreenInResponsive ? "none" : maxHeight;
  const mobileMainWidth = fullScreenInResponsive ? "100%" : mainWidth;
  const mobileMainHeight = fullScreenInResponsive ? "100%" : mainHeight;
  const mobileBorderRadius = fullScreenInResponsive ? "0" : borderRadius;

  /**
   * SETUP CLASS NAME
   */
  const className = classnames(["Lightbox", cName, displayClass, { fullScreenInResponsive }]);

  if (isFixed) {
    showCancelButton = false;
    closeOnBackClick = false;
  }

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <Portal selector="#portal">
      <div className={className}>
        <div className="box">
          <Column fillHeight stretchChildren>

            {/* TITLE */}
            {title && <div className="title">{title}</div>}

            {/* CANCEL BUTTON */}
            {(showCancelButton !== false) && 
              <div className="cancelButton">
                <ClickableIcon
                  icon="&times;"
                  color={theme.colors.lightText}
                  background={theme.colors.backgroundColor}
                  hasShadow={true}
                  onClick={toggle}
                  fontSize="2.2rem"
                  highlightBackground={false}
                />
              </div>
            }

            {/* CONTENT */}
            <Flex span={1} overflow="auto">
              <div className="content"> {children} </div>
            </Flex>

            {/* BOTTOM ACTIONS */}
            {(bottomActions && bottomActions.length > 0) &&
              <div className="bottomActions">
                {bottomActions.map((item, index) => 
                  <div key={`bottomAction_${index}`} className="bottomActionWidget">{item}</div>
                )}
              </div>
            }
          </Column>

        </div>

        <div className="backdrop" onClick={(closeOnBackClick !== false) ? toggle : null }></div>

        { /* STYLE */}
        <style jsx>{`
          .Lightbox {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: transparent;
            display: ${display};
            z-index: ${behindHeader ? 50 : 1000};
          }

          .title {
            padding: 18px;
            font-weight: bold;
            font-size: 1.1rem;
            border-bottom: 1px solid ${theme.colors.borderColor};
          }

          .backdrop{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            cursor: ${(closeOnBackClick === false) ? "auto" : "pointer"};
            z-index: 3;
            background: ${theme.colors.tintColor};
          }

          .show .backdrop{
            animation: fadeIn 0.25s 1 linear forwards;
          }

          .hide .backdrop{
            animation: fadeOut 0.25s 1 ${`linear`} forwards;
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
          }          

          .box {
            background: ${theme.colors.backgroundColor};
            position: absolute;
            overflow: hidden;
            z-index: 1000;
            top: 40%;
            width: ${mainWidth};
            height: ${mainHeight};
            max-width: ${maxWidth};
            max-height: ${maxHeight};
            border-radius: ${borderRadius};
            box-shadow: ${theme.boxShadows.medShadow};
            left: 50%;
            transform: translate(-50%, -40%);
          }

          .show .box {
            animation: slideIn 0.25s 1 ease-out forwards;
          }

          .hide .box {
            animation: slideOut 0.25s 1 ${`ease-out`} forwards;
          }

          @keyframes slideIn {
            0% { opacity: 0; top: 80%; }
            100% { opacity: 1; top: 40%; }
          }

          @keyframes slideOut {
            0% { opacity: 1; top: 40%; }
            100% { opacity: 0; top: 80%; }
          }

          .cancelButton {
            position: absolute;
            top: 8px;
            right: 12px;
          }

          .content {
            padding: ${contentPadding};
            height: 100%;
          }

          .bottomActions {
            border-top: 1px solid ${theme.colors.borderColor};
            display: flex;
            flex-wrap: wrap;
            justify-content: ${bottomActionsAlignment};
            padding: 5px 10px;
          }
          
          .bottomActionWidget {
            padding: 5px;
          }

          @media screen ${`and`} (max-width: ${responsiveWidth || "800px"}){
            .box {
              width: ${mobileMainWidth};
              height: ${mobileMainHeight};
              max-width: ${mobileMaxWidth};
              max-height: ${mobileMaxHeight};
              border-radius: ${mobileBorderRadius};
            }
          }   

        `}</style>
      </div>
    </Portal>
  );
};

export default Lightbox;