import React from 'react';
import DropDownView from '../DropDownView';
import SearchInputField from '../SearchInput';

const SearchInput = ({ placeholder, maxWidth, suggestions, defaultValue, onChange, onSearch }) => {

  return (
    <div className="SearchInput">
      <DropDownView
        showArrow={false}
        width="100%"
        padding="0"
        view={<SearchInputField placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} onSearch={onSearch} />}
        dropView={(suggestions.length > 0) && suggestions}
        highlightOnHover={false}
        matchWidth={true}
      />
      
      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .SearchInput {
          width: 100%;
          max-width: ${maxWidth || "500px"};
        }
        
        @media screen and (max-width: ${"800px"}){
          .SearchInput {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchInput;