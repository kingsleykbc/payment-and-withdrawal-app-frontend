import React from 'react';
import { slicer } from '../../functions/functions';
import theme from '../../config/theme';
import Container from './Container';
import IcWarning from 'react-icons/lib/md/warning';
import IcInfo from 'react-icons/lib/md/info-outline';

// =======================================================================
//  TEXT
// =======================================================================
export const Text = ({ children,
  wrap,
  slicedAt,
  color,
  fontStyle,
  fontSize,
  fontWeight,
  fontFamily,
  lineHeight,
  alignment,
  isLightText,
  isSmallText,
  isBold,
  decoration
}) => {
  const text = (slicedAt) ? slicer(children, slicedAt) : children;
  color = (color) ? color : (isLightText) ? theme.colors.lightText : theme.colors.textColor;
  fontWeight = fontWeight ? fontWeight : (isBold) ? "bold" : "normal";
  fontSize = fontSize ? fontSize : (isSmallText) ? "0.9rem" : "1rem";
  decoration = decoration || "none";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <span className="Text">
      {text}

      { /* STYLE */}
      <style jsx>{`
        .Text {
          color: ${color};
          font-size: ${fontSize};
          word-wrap: ${wrap ? "break-word" : "normal"};
          word-break: ${wrap ? "break-all" : "normal"};
          font-style:  ${fontStyle || "normal"};
          font-weight: ${fontWeight};
          font-family: ${fontFamily || "'Rubik', Arial, Helvetica, sans-serif"};
          line-height: ${lineHeight || "25px"};
          text-align: ${alignment || "inherit"};
          text-decoration: ${decoration};
        }
      `}</style>
    </span>
  );
};


// =======================================================================
//  PARAGRAPHS
// =======================================================================
export const Par = ({
  children,
  wrap,
  slicedAt,
  color,
  fontStyle,
  fontWeight,
  fontSize,
  lineHeight,
  preWrap,
  alignment,
  isLightText,
  isBold,
  isSmallText
}) => {

  const text = (slicedAt) ? slicer(children, slicedAt) : children;
  const whiteSpace = preWrap ? "pre-wrap" : "normal";

  color = (color) ? color : (isLightText) ? theme.colors.lightText : theme.colors.textColor;
  fontWeight = fontWeight ? fontWeight : (isBold) ? "bold" : "normal";
  fontSize = fontSize ? fontSize : (isSmallText) ? "0.9rem" : "1rem";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <p className="Par">
      {text}
      { /* STYLE  */}
      <style jsx>{`
        .Par {
          color: ${color};
          font-size: ${fontSize || "1rem"};
          line-height: ${lineHeight || "25px"};
          word-wrap: ${wrap ? "break-word" : "normal"};
          word-break: ${wrap ? "break-all" : "normal"};
          font-style:  ${fontStyle || "normal"};
          font-weight: ${fontWeight};
          text-align: ${alignment || "inherit"};
          white-space: ${whiteSpace};
        }
      `}</style>
    </p>
  );
};


// =======================================================================
//  TEXT WITH ICON
// =======================================================================
export const IconText = (
  { children, padding, iconPadding, display, margin, align, icon, iconColor, iconSize, iconBack, iconBackColor, iconBackSize, ...textProps }
) => {
  display = (display === "block") ? "flex" : "inline-flex";
  margin = margin || "0";
  padding = padding || "10px";
  iconPadding = iconPadding || "12px";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="IconText" >
      {icon && <div className="icon">{icon}</div>}
      <Container marginLeft={icon && iconPadding} marginRight={iconBack && iconPadding}>
        <Text {...textProps}>{children}</Text>
      </Container>
      {iconBack && <div className="iconBack">{iconBack}</div>}


      {/* STYLE */}
      <style jsx>{`
        .IconText {
          display: ${display};
          align-items: ${align || "center"};
          padding: ${padding};
          margin: ${margin};
        }

        .icon{
          ${align === "flex-start" && "margin-top: 5px;"}
        }

        .icon :global(svg){
          font-size: ${iconSize || "1.5rem"};
          vertical-align: middle;
          margin-top: -2px;
        }

        .iconBack :global(svg){
          font-size: ${iconBackSize || "1.5rem"};
          vertical-align: middle;
        }

        .icon :global(svg *){
          fill: ${iconColor || theme.colors.primaryColor} !important;
        }

        .iconBack :global(svg *){
          fill: ${iconBackColor || theme.colors.secondaryColor} !important;
        }
      `}</style>
    </div>
  );
};


/**
 * INFO TEXT
 */
export const InfoText = ({ children, icon, isWarning, isMultiline, ...textProps }) => {
  icon = (isWarning) ? <IcWarning /> : <IcInfo />;

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <IconText
      icon={icon} align={isMultiline ? "flex-start" : "center"}
      color={theme.colors.lightText}
      iconColor={isWarning ? theme.colors.warningColor : theme.colors.lightText}
      {...textProps}
    >
      {children}
    </IconText>
  );
}


// =======================================================================
//  HIGHLIAGHTED TEXT
// =======================================================================
export const HighlightedText = ({ children, width, display, maxWidth, padding, color, type, margin, highlghtColor, ...textProps }) => {
  padding = padding || "8px 20px";
  width = width ? width : maxWidth ? "100%" : "auto";
  margin = margin || "0";
  display = display || "inline-block";

  let newColor;
  if (!highlghtColor) {
    if (type === "success") {
      newColor = theme.colors.successColor;
      highlghtColor = theme.colors.successHighlightColor;
    }
    else if (type === "danger" || type === "error") {
      newColor = theme.colors.dangerColor;
      highlghtColor = theme.colors.dangerHighlightColor;
    }
    else {
      newColor = theme.colors.textColor;
      highlghtColor = theme.colors.highlightColor;
    }
  }
  color = color || newColor;

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="HighlightedText">
      <Text isBold {...textProps} color={color}> {children} </Text>

      { /* STYLE */}
      <style jsx>{`
        .HighlightedText {
          padding: ${padding};
          margin: ${margin};
          display: ${display};
          width: ${width};
          text-align: center;
          border-radius: 5px;
          background: ${highlghtColor};
        }
      `}</style>
    </div>
  );
};


// =======================================================================
//  KEY VALUE TEXT
// =======================================================================
export const KeyValText = ({ item, value, display, itemColor, itemFontSize, itemValueSize, itemFontWeight, itemValPadding, margin, ...textComponents }) => {
  display = display || "inline-block";
  itemColor = itemColor || theme.colors.lightText;
  itemValPadding = itemValPadding || "8px";
  margin = margin || "0";
  itemFontSize = itemFontSize || "0.9rem";
  itemFontWeight = itemFontWeight || "bold";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="KeyValText">
      <div className="item">
        <Text color={itemColor} fontSize={itemFontSize} fontWeight={itemFontWeight} >{item}</Text>
      </div>
      <Text fontSize="1rem" {...textComponents}>
        {value}
      </Text>

      { /* STYLE */}
      <style jsx>{`
        .KeyValText {
          display: ${display};
          margin: ${margin};
        }
        .item {
          margin-bottom: ${itemValPadding};
        }
      `}</style>
    </div>
  );
};
