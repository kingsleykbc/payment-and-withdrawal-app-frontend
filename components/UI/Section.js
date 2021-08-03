import React from 'react';
import theme from '../../config/theme';
import Spacing from './Spacing';
import { IconText } from './TextComponents';

const Section = ({
  title,
  icon,
  children,
  margin,
  contentPadding,
  padding,
  responsiveMargin,
  responsivePadding,
  responsiveWidth,
  className,
  titleFontSize,
  titleFontColor,
  hasBorder,
  borderDirections,
  mobileBorderDirections,
  borderWidth,
  borderColor,
  titleFontWeight
}) => {

  /**
   * GET STYLES
   */
  contentPadding = contentPadding || "15px 0 0 0";
  margin = margin || "0";
  padding = padding || "0";
  responsiveMargin = responsiveMargin || margin;
  responsivePadding = responsivePadding || padding;
  responsiveWidth = responsiveWidth || "800px";
  titleFontSize = titleFontSize || "1rem";
  titleFontColor = titleFontColor || theme.colors.lightText;
  titleFontWeight = titleFontWeight || "bold";

  /**
 * GET BORDERS
 */
  let borders = "";
  let mobileBorders = "";
  borderDirections = borderDirections || "all";
  mobileBorderDirections = mobileBorderDirections || borderDirections;

  const getBorders = (bDirections) => {
    const borderValue = `${borderWidth || "1px"} solid ${borderColor || theme.colors.borderColor}`;
    const allBorders = bDirections === "all";
    let mainBorders = "";

    if (allBorders || bDirections.includes("l")) mainBorders += `border-left: ${borderValue};`;
    if (allBorders || bDirections.includes("r")) mainBorders += `border-right: ${borderValue};`;
    if (allBorders || bDirections.includes("b")) mainBorders += `border-bottom: ${borderValue};`;
    if (allBorders || bDirections.includes("t")) mainBorders += `border-top: ${borderValue};`;

    return mainBorders;
  }

  if (hasBorder) {
    borders = getBorders(borderDirections);
    mobileBorders = (mobileBorderDirections === borderDirections)
      ? borders
      : getBorders(mobileBorderDirections);
  }

  // ================================================================================================
  //  UI
  // ================================================================================================
  return (
    <div className={`Section ${className}`}>

      {/* TITLE */}
      <IconText padding="0" iconSize="1.1rem" iconColor={theme.colors.lightText} icon={icon} color={titleFontColor} fontWeight={titleFontWeight} fontSize={titleFontSize}>
        {title}
      </IconText>

      {/* CONTENT */}
      <Spacing padding={contentPadding}> {children} </Spacing>

      { /* STYLE */}
      <style jsx>{`
        .Section {
          padding: ${padding};
          line-height: 26px;
          margin: ${margin};
          ${borders}
        }

        @media screen and (max-width: ${responsiveWidth}){
          .Section {
            padding: ${responsivePadding};
            margin: ${responsiveMargin};
            ${mobileBorders}
          }
        }
      `}</style>
    </div>
  );
};

export default Section;