import React from 'react';
import Dot from 'react-icons/lib/go/primitive-dot';
import theme from '../../config/theme';
import {Text} from './TextComponents';


const DividedText = ({ items, dividerColor, divider, padding, paddingBetween, color, ...textProps }) => {

  /**
   * GET CSS VALS
   */
  dividerColor = dividerColor || color || theme.colors.lightestText;
  color = color || theme.colors.lightText;
  paddingBetween = paddingBetween || "7px";
  padding = padding || "0";

  /**
   * DIVIDER ICON
   */
  divider = <div className="Divider"> 
    {divider || <Dot />} 

    { /* STYLE */}
    <style jsx>{`
      .Divider{
        margin: 0 ${paddingBetween};
        font-size: 0.65rem;
      }

      .Divider :global(svg *){
        fill: ${dividerColor} !important;
      }
    `}</style>
  </div>; 

  /**
   * DIVIDED TEXT
   */
  const dividedText = items.map((item, index, arr) => {
    let dividerWid = (index < arr.length - 1) && divider;    
    return (
      <span className="spannedText" key={index}>
        <Text color={color} isSmallText {...textProps}>{item}</Text>
        {dividerWid}

        { /* STYLE */}
        <style jsx>{`
          .spannedText {
            display:inline-flex;
            align-items: center;
            flex-wrap: wrap;
            line-height: 25px;
          }
        `}</style>
      </span>
    )
  });


  // =======================================================================
  //  UI
  // =======================================================================
  return(
    <div className="DividedText">
      {dividedText}

      { /* STYLE */}
      <style jsx>{`        
        .DividedText{
          display:flex;
          align-items:center;
          flex-wrap: wrap;
          line-height: 25px;
          padding: ${padding};
        }
      `}</style>  
    </div>
  )
};

export default DividedText;
