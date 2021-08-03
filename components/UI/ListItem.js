import React from 'react';
import IcGo from 'react-icons/lib/md/chevron-right';
import {Row} from './Flex';

import theme from '../../config/theme';
import Container from './Container';


const ListItem = ({
  icon,
  title,
  subTitle,
  titleWeight,
  titleSize,
  mobileIconSize,
  subTitleColor,
  hasGoButton,
  onClick,
  isClickable,
  onGoButtonClick,
  iconSize,
  iconColor,
  hPadding,
  vPadding,
  hasBottomBorder,
  hasShadow,
  growOnHover,
  goButtonIcon,
  flexAlignment,
  bottomLeft,
  bottomRight,
  topRightSection,
  titleColor
}) => {

  /**
   * GET THE STYLES
   */
  titleColor = titleColor || theme.colors.textColor;
  subTitleColor = subTitleColor || theme.colors.lightText;
  flexAlignment = flexAlignment || "flex-start";
  iconSize = iconSize || "2.4rem";
  mobileIconSize = mobileIconSize || "1.8rem";
  isClickable = isClickable || onClick;

  const bottomBorder = (hasBottomBorder !== false && !hasShadow) ? `1px solid ${theme.colors.borderColor}` : "none";
  const padding = `${vPadding || "15px"}  ${(hPadding) ? hPadding : (hasShadow) ? "15px" : "0"}`;
  const boxShadow = hasShadow ? theme.boxShadows.smallShadow : "none";
  const margin = hasShadow ? "5px 0" : "0";
  const cursor = isClickable ? "pointer" : "default";
  const transform = (growOnHover) ? "scale(1.03)" : "none";
  const hoverBg = (isClickable && !growOnHover) ? theme.colors.highlightColor : theme.colors.backgroundColor;
  
  const hasBottomElements = (bottomLeft || bottomRight);
  onClick = onClick ? onClick : undefined;
  onGoButtonClick = (onGoButtonClick && !onClick) ? onGoButtonClick : undefined;
 
  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="ListItem" onClick={onClick}>
 
      {/* LEADING ICON */}
      {icon && <div className="icon">{icon}</div>}

      {/* TITLE AND SUB TITLE */}
      <Row dir="column" span={1} className="titleAndSub">
        <Row justify="space-between" align="flex-start">
          <div className="title"> {title} </div>
          {topRightSection && <div className="TopRightSection"> {topRightSection} </div>}
        </Row>

        {subTitle && <div className="subtitle">{subTitle}</div>}

        {/* BOTTEM ELEMENTS (IF ANY) */}
        {hasBottomElements &&
          <Container marginTop="15px" width="100%">
            <Row justify="space-between">
              <div className="bottomLeft">{bottomLeft}</div>
              <div className="bottomRight">{bottomRight}</div>
            </Row>
          </Container>
        }
      </Row>

      {/* GO BUTTON */}
      {hasGoButton && <div onClick={onGoButtonClick} className="goIcon">{goButtonIcon || <IcGo/>}</div> }


      { /* STYLE ======================================================================================= */}

      <style jsx>{`
        .ListItem {
          display: flex;
          border-bottom: ${bottomBorder} !important;
          padding: ${padding};
          margin: ${margin};
          box-shadow: ${boxShadow};     
          cursor: ${cursor};
          transition: ${"all linear"} 0.25s;
          align-items: ${flexAlignment};
          background: ${theme.colors.backgroundColor};
        }

        .ListItem:hover {
          transform: ${transform};
          background: ${hoverBg};
        }

        .title{
          margin-bottom: 8px;
          color: ${titleColor};
          font-weight: ${titleWeight || "bold"};
          font-size: ${titleSize || "1.1rem"};
        }

        .icon{
          font-size: ${iconSize};
          margin-right: 15px;
          vertical-align: middle;
        }

        .subtitle {
          color: ${subTitleColor};
        }

        .ListItem :global( svg *){
          fill: ${iconColor || theme.colors.primaryColor};
          vertical-align: middle;
        }

        .goIcon{
          align-self: center;
        }

        .goIcon :global(svg){
          font-size: 1.3rem;
        }

        .bottomLeft, .bottomRight {
          font-size: 0.9rem;
          color: ${theme.colors.lightText};
          font-weight: bold;
        }

        @media screen and (max-width: 800px){
          .icon {
            align-self: flex-start;
            font-size: ${mobileIconSize};
          }
        }
      `}</style>
    </div>
  );
};

export default ListItem;