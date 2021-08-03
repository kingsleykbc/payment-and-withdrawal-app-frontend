import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import theme from '../../config/theme';
import SectionContent from './SectionContent';
import Spacing from './Spacing';

const TabSwitch = ({
  padding,
  tabs,
  color,
  activeColor,
  backgroundColor,
  switchColor,
  fontWeight,
  activeFontWeight,
  maxTabSwitchWidth,
  availableViewIndexes,
  dividerColor,
  onChange,
  contentPadding,
  responsiveContentPadding,
  tabPadding,
  children
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  tabs = tabs || [];
  padding = padding || "4px";
  maxTabSwitchWidth = maxTabSwitchWidth || "900px";
  tabPadding = tabPadding || "0 10px";
  color = color || theme.colors.lightText;
  activeColor = activeColor || theme.colors.textColor;
  backgroundColor = backgroundColor || theme.colors.highlightColor;
  fontWeight = fontWeight || "normal";
  activeFontWeight = activeFontWeight || fontWeight;
  switchColor = switchColor || theme.colors.backgroundColor;
  dividerColor = dividerColor || theme.colors.borderColor;

  /**
   * ON CHANGE TAB
   */
  const handleChange = (tIndex, aViewIndexes = availableViewIndexes) => {
    if (tabIndex === tIndex) return;
    const didSwitch = (!aViewIndexes || (aViewIndexes && aViewIndexes.indexOf(tIndex) !== -1));
    if (didSwitch) setTabIndex(tIndex)
    if (onChange) onChange(tIndex, didSwitch);
  }

  // ================================================================================================
  //  UI
  // ================================================================================================
  return (
    <>
      {/* TAB BAR */}
      <Spacing padding={tabPadding}>
        <SectionContent vPadding="0" hPadding="0" maxWidth={maxTabSwitchWidth}>
          <div className="TabSwitch">
            {tabs.map((item, index) => (
              <div className={classnames(["tabItem", { active: (tabIndex === index) }])} key={`${item}_${index}`} onClick={() => handleChange(index)}>
                {item}
              </div>
            ))}
          </div>
        </SectionContent>
      </Spacing>

      {/* 
        HANDLE VIEWS
        - If array is passed, show the view index
        - If you want to access the view and/or onChange function, pass a function as the child 
        - Else, just pass the child (if any)
      */}
      {children &&
        <Spacing padding={contentPadding} responsivePadding={responsiveContentPadding}>
          {
            (typeof (children) === "function") ? children({ view: tabIndex, handleChange })
              : Array.isArray(children) ? children[tabIndex]
              : children
          }
        </Spacing>
      }

      { /* STYLE */}
      <style jsx>{`
        .TabSwitch {
          display: flex;
          background: ${backgroundColor};
          border-radius: 6px;
          padding:${padding};
          position: relative;
          font-weight: ${fontWeight};
        }
        
        .tabItem{
          color: ${color};
          flex-grow: 1;
          text-align: center;
          padding: 9px;
          cursor: pointer;
          border-left: 1px solid ${dividerColor};
          margin-right: 4px;
          transition: background linear 0.2s;
        }
        
        .tabItem:last-child{
          margin-right: 0;
        }

        .tabItem:first-child{
          border-left: none;
        }

        .tabItem:hover{
          box-shadow: 0 2px 4px rgba(28, 27, 65, 0.15);
        }

        .tabItem.active{
          border-radius: 5px;
          border-color: ${switchColor};
          color: ${activeColor};
          background: ${switchColor};
          box-shadow: 0 2px 4px rgba(28, 27, 65, 0.15);
          font-weight: ${activeFontWeight};
        }

        .tabItem.active + .tabItem{
          border-left: none;
        }
      `}</style>
    </>
  );
};

export default TabSwitch;