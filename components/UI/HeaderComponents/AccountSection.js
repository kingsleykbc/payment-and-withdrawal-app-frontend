import React,{useState} from 'react';
import {Row} from '../Flex';

import IcAccount from 'react-icons/lib/md/perm-identity';
import ResponsiveToggle from '../ResponsiveToggle';
import theme from '../../../config/theme';
import ClickableIcon from '../ClickableIcon';
import Drawer from '../Drawer'; 
import Container from '../Container';

const AccountSection = ({ children, responsiveIcon, responsiveChild, responsiveCollapse }) => {

  return (
    <div className="AccountSection">
      <ResponsiveToggle
        maxWidth={responsiveCollapse}
        small={<MobileView responsiveIcon={responsiveIcon}>{responsiveChild || children}</MobileView>}
        large={<DesktopView>{children}</DesktopView>}
      />

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .AccountSection {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};

export default AccountSection;

/**
 * MOBILE
 */
const MobileView = ({ responsiveIcon, children }) => {
  const [showDrawer, setsShowDrawer] = useState(false);
  const toggle = () => setsShowDrawer(!showDrawer);
  
  return (
    <div className="MobileAccountSection">
      <ClickableIcon 
        icon={responsiveIcon || <IcAccount />}
        color={theme.colors.primaryColor} 
        hasBorder={true} 
        onClick={toggle} 
        filled={true} 
        hasShadow={true}
      />

      <Drawer show={showDrawer} toggle={toggle}> 
        <Container padding="10px">
          {children} 
        </Container>
      </Drawer>
    </div>
  );
}

/**
 * DESKTOP
 */
const DesktopView = ({children}) => <Row> {children} </Row>;