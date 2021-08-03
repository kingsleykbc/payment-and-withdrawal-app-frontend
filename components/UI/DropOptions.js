import React from 'react';
import DropDownView from './DropDownView';
import ListView from './ListView';
import Container from './Container';
import { IconText } from './TextComponents';
import theme from '../../config/theme';
import IcOptionMenu from 'react-icons/lib/md/more-vert';

const DropOptions = ({ options, origin, iconColor, color, view, ...props }) => {


  return (
    <div className="DropOptions">
      <DropDownView
        {...props}
        view = {view || <IcOptionMenu />}
        origin={origin || "top-right"}
        showArrow={view || false}
        closeOnDropViewClick
        dropView={
          <Container>
            <ListView 
              keyPrefix="dOption" 
              data={options} 
              component={DropOption} 
              globalColor={color}
              globalIconColor={iconColor}
            />
          </Container>
        }
      />
      
      <style jsx>{` 
        .DropOptions :global(.view) {
          ${ !view && "min-width: 0" };
          ${ !view && "padding: 0" };
          ${ !view && "min-height: 0" };
          ${ !view && "font-size: 1.4rem" };
        }

        .DropOptions :global(.view svg *) {
          ${ !view && "fill: #000" };
        }
      `}</style>
    </div>
  );
};

/**
 * DROP OPTION
 */
const DropOption = ({ icon, label, onClick, type, iconColor, color, globalColor, globalIconColor }) => {
  const defaultColor = type === "success" 
    ? theme.colors.successColor 
    : type === "danger" ? theme.colors.dangerColor 
    : null;

  const iColor = iconColor || globalIconColor || defaultColor;
  const textColor = color || globalColor || defaultColor;

  return (
    <Container onClick={onClick}>
      <IconText icon={icon} iconColor={iColor} color={textColor}>
        {label}
      </IconText>
    </Container>
  );
};

export default DropOptions;