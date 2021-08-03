import React from 'react';
import theme from '../../config/theme';

const KeyValListItem = ({ item, value, itemColor, valueColor, itemFontWeight, valueFontWeight, padding }) => {
  itemColor = itemColor || theme.colors.lightText;
  valueColor = valueColor || theme.colors.textColor;
  itemFontWeight = itemFontWeight || "normal";
  valueFontWeight = valueFontWeight || "bold";
  padding = padding || "12px 0";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="KeyValListItem">
      <div className="item">{item}</div>
      <div className="value">{value}</div>

      { /* STYLE */}
      <style jsx>{` 
        .KeyValListItem {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: ${padding};
          border-bottom: 1px solid ${theme.colors.borderColor};
        }

        .KeyValListItem:last-child {
          border-bottom: none;
        }

        .item {
          color: ${itemColor};
          font-weight: ${itemFontWeight};
          padding-right: 15px;
        }

        .value {
          color: ${valueColor};
          font-weight: ${valueFontWeight};
        }
      `}</style>
    </div>
  );
};

export default KeyValListItem;