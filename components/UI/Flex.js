import React from 'react';
import classnames from 'classnames';

export const Flex = ({
  children, className, dir, justify, align, wrap, span, basis, responsiveWidth, fillHeight, height,
  crossSpan, stretchChildren, shrink, width, mobileWidth, wrapOnlyResponsive, responsiveCollapse, overflow
}) => {
  /**
   * SETUP CSS
   */
  let flexAttr = "";
  overflow = overflow || "visible";
  
  if (dir){
    flexAttr = "display: flex;";
    align = align || (dir === "column" ? "flex-start" : "center");
    justify = justify || "flex-start";
  
    if (dir === "column"){
      let temp = align;
      align = (stretchChildren) ? "stretch" : justify;
      justify = temp;
      wrap = wrap || false;
    }
  }
  
  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className={classnames(["Flex",{ [className]: className}])}>
      {children}

      { /* DYNAMIC STYLE ======================================================================================= */}
      <style jsx>{`
        .Flex{
          ${flexAttr}
          flex-direction: ${dir || "row"};
          align-items: ${align};
          align-self: ${crossSpan || "stretch"};
          justify-content: ${justify};
          overflow: ${overflow};
          width: ${width || "auto"};
          flex-grow: ${span || 0};
          flex-shrink: ${(shrink == 0) ? 0 : 1};
          flex-basis: ${basis || "auto"};
          height: ${fillHeight ? "100%" : (height) ? height : "auto"};
          flex-wrap: ${(wrap === false || wrapOnlyResponsive) ? "nowrap" : `${"wrap"}`};
        }

        @media screen and (max-width: ${responsiveWidth || "800px"}){
          .Flex {
            flex-direction: ${responsiveCollapse ? "column" : dir};
            align-items: ${responsiveCollapse ? "stretch" : align};
            width: ${mobileWidth || "100%"};
            ${wrapOnlyResponsive && "flex-wrap: wrap;"};
          }
        }
      `}</style>
    </div>
  );
};

/**
 * ROW
 */
export const Row = ({ children, ...props }) => <Flex dir="row" {...props}>{children}</Flex>

/**
 * COLUMN
 */
export const Column = ({ children, ...props }) => <Flex dir="column" {...props}>{children}</Flex>

