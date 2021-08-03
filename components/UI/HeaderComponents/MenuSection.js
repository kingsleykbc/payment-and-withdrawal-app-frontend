import React,{useState} from 'react';
import { Row, Column} from '../Flex';

import IcMenu from 'react-icons/lib/md/menu';
import Drawer from '../Drawer';
import ResponsiveToggle from '../ResponsiveToggle';
import ClickableIcon from '../ClickableIcon';
import theme from '../../../config/theme';
import Con from '../Container';

const MenuSection = ({ children, alignment, responsiveIcon, responsiveCollapse }) => {
  const span = (alignment && alignment != "right") && 1;
  const justify = (alignment == "left") ? "flex-start" : (alignment == "center") ? "center" : "flex-end";

  return (
    <div className="MenuSection">
      <ResponsiveToggle
        maxWidth={responsiveCollapse}
        small = {<MobileMenu responsiveIcon={responsiveIcon}>{children}</MobileMenu>}
        large = {<DesktopMenu span={span} justify={justify}>{children}</DesktopMenu>}
      />

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .MenuSection {
          margin-left: 10px;
          flex-grow: ${span};
        }
        @media screen and (max-width: ${"800px"}){
          .MenuSection {
            flex-grow: 0;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * MOBILE VIEW
 */
const MobileMenu = ({ children,  responsiveIcon }) => {
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const toggleResponsiveMenu = () => setShowResponsiveMenu(!showResponsiveMenu);

  return (
    <Row className="MenuSection">
      <ClickableIcon 
        icon={responsiveIcon || <IcMenu />} 
        onClick={toggleResponsiveMenu} 
        color={theme.colors.textColor} 
        hasBorder={true}
      />

      <Drawer show={showResponsiveMenu} toggle={toggleResponsiveMenu}>
        <Con padding="20px"> 
          <Column fillHeight={true} stretchChildren>
          {children} 
          </Column>
        </Con>
      </Drawer>
    </Row>
  );
}

/**
 * DESKTOP MENU
 */
const DesktopMenu = ({ children, span, justify}) => (
  <Row className="MenuSection" span={span} justify={justify}>
    {children}
  </Row>
);

export default MenuSection;