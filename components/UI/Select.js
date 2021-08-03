import React, { useState } from 'react';
import DropDownView from './DropDownView';
import theme from '../../config/theme';
import IcSearch from 'react-icons/lib/md/search';

const Select = ({
  options,
  onChange,
  defaultValue,
  iconColor,
  icon,
  placeholder,
  showResetButton,
  hasSearchFilter,
  showValueInField
}) => {
  options.forEach((item, index) => { item.index = index; });

  const [selectedIndex, setSelctedIndex] = useState(getSelectedIndexFromValue(defaultValue, options));
  const [keyword, setKeyword] = useState("");
  const [searchOptions, setSearchOptions] = useState(options);

  /**
   * HANDLE SEARCH
   */
  const onSearch = ({ target: { value } }) => {
    setSelctedIndex("");
    if (onChange) onChange(null);

    setKeyword(value);
    setSearchOptions(searchfilter(value, options));
  }

  /**
   * SELECT ONLY OPTION (IF THAT IS WHAT IS ENTERED)
   */
  const selectOnlyOption = () => {
    if (searchOptions.length === 1)
      handleSelect(searchOptions[0].index);
  }

  /**
   * RESET SELECT
   */
  const reset = () => {
    setKeyword("");
    setSelctedIndex(null);
    if (onChange) onChange('');
  }

  /**
   * HANDLE OPTION CLICK
   */
  const handleSelect = (index) => {
    setKeyword("");
    setSelctedIndex(index);
    if (onChange) onChange(options[index].value || options[index].label);
  }

  /**
   * MAP THE OPTIONS
   */
  const optionWidgets = searchOptions.map((item, index) => {
    const isSelected = item.index === selectedIndex;
    return (
      <Option
        key={`${item.label}_${index}`}
        {...item}
        onSelect={handleSelect}
        isSelected={isSelected}
      />
    )
  });

  /**
   * GET VALUES
   */
  const valueExists = selectedIndex !== null && options[selectedIndex];
  const option = options[selectedIndex];
  const selectValue = (!valueExists)
    ? ""
    : (showValueInField && option.value) ? option.value
      : option.label;

  const inputValue = (keyword)
    ? keyword
    : (valueExists) ? selectValue
      : (hasSearchFilter ? "" : "Not selected");

  const viewIcon = icon
    ? icon
    : (hasSearchFilter) ? <div className="search"><IcSearch className="search" /></div>
      : (valueExists) ? option.icon
        : null;

  const pHolder = placeholder ? placeholder : hasSearchFilter ? "Search" : null;

  /**
   * RESET BUTTON
   */
  const resetButton = (!inputValue) ? null : <div className="resetButton" onClick={reset}>
    &times;

    <style jsx>{`
      .resetButton {
        cursor: pointer;
        color: ${theme.colors.lightestText};
      }
      .resetButton:hover {
        color: #000;
      }
    `}</style>
  </div>;

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="Select">
      <DropDownView
        view={
          <div className="view">
            {viewIcon && <div className="icon">{viewIcon}</div>}

            <input
              type="text"
              value={inputValue}
              placeholder={pHolder}
              disabled={!hasSearchFilter}
              onChange={onSearch}
              onBlur={selectOnlyOption}
            />
          </div>
        }

        dropView={<div className="holder"> {optionWidgets} </div>}
        dropDownHeight="250px"
        matchWidth
        arrowIcon={showResetButton && resetButton}
        width="100%"
        closeOnDropViewClick={true}
      />

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .view {
          display: flex;
          width: 100%;
          align-items: center;
        }

        .icon {
          vertical-align: middle;
          font-size: 1.5em;
          margin-right: 10px;
          margin-top: -4px;
        }

        .Select {
          border: 1px solid ${theme.colors.borderColor};
          border-radius: 5px;
        }

        input {
          width: 100%; 
          background: none !important;
          padding: 0;
          border: ${`none`} !important;
          cursor: pointer;
          color:${inputValue === "Not selected" ? theme.colors.lightText : theme.colors.textColor}
        }

        input:focus {
          box-shadow: none;
        }

        .icon :global(svg *){
          fill: ${iconColor || theme.colors.primaryColor};
        }

        .icon :global(.search svg *){
          fill: ${iconColor || theme.colors.lightText} !important;
        }
      `}</style>
    </div>
  );
};

export default Select;


/**
 * OPTION
 */
const Option = ({ icon, label, index, onSelect, isSelected }) => {
  const background = (isSelected) ? theme.colors.highlightColor : theme.colors.backgroundColor;
  const fontWeight = (isSelected) ? "bold" : "normal";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="Option" onClick={() => onSelect(index)}>
      {icon && <div className="icon">{icon}</div>}
      <div className="label">{label}</div>

      { /* STYLE  */}
      <style jsx>{`
        .Option {
          padding: 10px;
          cursor: pointer;
          color: ${theme.colors.textColor};
          background: ${background};
          font-weight: ${fontWeight};
          display: flex;
          align-items: center;
          transition: all linear 0.25s;
          border-radius: 5px;
        }

        .Option:hover {
          background: ${theme.colors.highlightColor};
        }

        .icon {
          margin-right: 12px;
          font-size: 1.3em;
        }

        .icon :global(svg *){
          fill: ${theme.colors.primaryColor};
        }
      `}</style>
    </div>
  );
};


// =======================================================================
//  FUNCTIONS
// =======================================================================
/**
 * GET SELECT OBJECT FROM VALUE 
 */
export function getSelectedIndexFromValue(value, options) {
  if (!value) return null;

  for (var i = 0; i < options.length; i++) {
    const option = options[i];
    if (option.value === value || option.label === value) return option.index;
  }
  return null;
}

/**
 * SEARCH FILTER
 */
export function searchfilter(needle, haystack) {
  if (needle.trim() === "") return haystack;

  let keyword = needle.toUpperCase();
  let result = haystack.filter(({ label, value }) => {
    let labelText = label.toString().toUpperCase();
    if (value) labelText += ` ${value.toUpperCase()}`;
    return (labelText.indexOf(keyword) > -1);
  });
  return result;
}