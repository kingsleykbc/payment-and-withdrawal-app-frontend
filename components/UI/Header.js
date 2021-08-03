import React, { Component } from 'react';
import {Row} from './Flex';
import theme from '../../config/theme';

import Logo from './HeaderComponents/Logo';
import AccountSection from './HeaderComponents/AccountSection';
import MenuSection from './HeaderComponents/MenuSection';
import SearchSection from './HeaderComponents/SearchSection';
import MenuItem from './HeaderComponents/MenuItem';
import SearchInput from './HeaderComponents/HeaderSearchInput';


export default class Header extends Component {
  render() {
    let {
      children,
      ribbonSection,
      hPadding,
      ribbonHeight,
      ribbonPadding,
      showRibbon,
      color,
      vPadding,
      hasShadow,
      position
    } = this.props;

    /**
     * GET THE CSS
     */
    if (showRibbon === false){
      ribbonSection = null;
      ribbonHeight = "0";
    }
    ribbonHeight = ribbonHeight || "0";
    ribbonPadding = ribbonPadding || "10px 20px";
    const padding = `${vPadding || "0"} ${hPadding || "20px"}`;
    const boxShadow = (hasShadow !== false) ? theme.boxShadows.medShadow : "none";

    // =======================================================================
    //  UI
    // =======================================================================
    return (
      <div className="Header">
        {ribbonSection && <div className="ribbonSection">{ribbonSection}</div>}
        <div className="HeaderWrap">
          <Row className="HeaderInner" span={1}>{children}</Row>
        </div>
        <style jsx>{`
          .Header {
            position: ${position || "static"} !important;
            width: 100%;
            top: -${ribbonHeight};
            z-index: 1500;
            left:0;
            right: 0;
            box-shadow: ${boxShadow};
          }

          .HeaderWrap {
            height: 60px !important;
            display: flex;
            align-items: center;
            width: 100%;
            z-index: 100;
            background: ${color ? color : theme.colors.backgroundColor};
            padding: ${padding};
          }

          .ribbonSection {
            background: ${theme.colors.primaryColor};
            color: #fff;
            padding: ${ribbonPadding};
            font-weight: bold;
          }

        `}</style>          
      </div>
    );
  }
}

/**
 * LOGO SECTION
 */
Header.Logo = Logo;

/**
 * SEARCHBAR SECTION
 */
Header.SearchSection = SearchSection;

/**
 * SEARCH INPUT
 */
Header.SearchInput = SearchInput;

/**
 * SEARCHBAR SECTION
 */
Header.MenuSection = MenuSection;

/**
 * ACCOUNT SECTION
 */
Header.AccountSection = AccountSection;

/**
 * MENU ITEM
 */
Header.MenuItem = MenuItem;