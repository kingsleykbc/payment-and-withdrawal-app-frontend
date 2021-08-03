import React,{useState} from 'react';
import {Row} from '../Flex';

import IcSearch from 'react-icons/lib/md/search';
import ResponsiveToggle from '../ResponsiveToggle';
import ClickableIcon from '../ClickableIcon';
import IcBack from 'react-icons/lib/md/arrow-back';
import theme from '../../../config/theme';


const SearchBar = ({ children, alignment, responsiveIcon }) => {
  const justify = (alignment == "left") ? "flex-start" : (alignment == "right") ? "flex-end" : "center";

  return (
    <div className="SearchBar">
      <ResponsiveToggle
        small={<MobileView responsiveIcon={responsiveIcon}>{children}</MobileView>}
        large={<DesktopView justify={justify}>{children}</DesktopView>}
      />

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .SearchBar {
          flex-grow: 1;
          justify-content: ${justify};
          margin-left: 20px;
        }
        .SearchBar :global(.large){
          display: flex;
          flex-grow: 1;
          justify-content: ${justify};
        }

        @media screen and (max-width: ${"800px"}){
          .SearchBar {
            flex-grow: 0;
          }
          
          .SearchBar :global(.large){
            flex-grow: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;

/**
 * MOBILE
 */
const MobileView = ({ responsiveIcon, children }) => {
  const [showDrawer, setsShowDrawer] = useState(false);
  const toggle = () => setsShowDrawer(!showDrawer);
  return (
    <Row justify="flex-end">
      <ClickableIcon icon={responsiveIcon || <IcSearch />} color={theme.colors.textColor} hasBorder={true} onClick={toggle}/>
      <MobileSearchInput show={showDrawer} toggle={toggle}> {children} </MobileSearchInput>
    </Row>
  )
};

/**
 * DESKTOP
 */
const DesktopView = ({ justify, children }) => (
  <Row className="searchBarContent" span={1} justify={justify}>{children}</Row>
);

/**
 * MOBILE SEARCHBAR INPUT
 */
const MobileSearchInput = ({show, toggle, children}) => {
  const display = (show) ? "flex" : "none";

  return (
    <div className="MobileSearchInput">
      <ClickableIcon icon={<IcBack />} highlightBackground={false} onClick={toggle}/>
      <div className="searchSection"> {children} </div>

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .MobileSearchInput {
          position: fixed;
          padding: 0 10px;
          background: #fff;
          top:0;
          left:0;
          right:0;
          height: 60px;
          display: flex;
          align-items: center;
          display: ${display};
        }

        .searchSection {
          flex-grow: 1;
          margin-left: 5px;
        }
      `}</style>
    </div>
  );
};
