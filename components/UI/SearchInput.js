import React from 'react';
import ClickableIcon from './ClickableIcon';
import IcSearch from 'react-icons/lib/md/search';
import { Row, Flex } from './Flex';
import Container from './Container';

const Search = ({ placeholder, defaultValue, onChange, onSearch }) => {
  
  /**
   * SEARCH ON ENTER
   */
  const handleKeyPress = ({ keyCode }) => {
    if (keyCode === 13 && onSearch) onSearch();
  }

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="Search">
      <Row wrap={false}>
        <Flex span={1} shrink={2} align="center" crossSpan="center">
          <input
            className="search"
            type="text"
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={handleKeyPress} 
          />
        </Flex>
        <Container marginLeft="8px">
          <ClickableIcon
            onClick={onSearch}
            highlightBackground={false}
            icon={<IcSearch />}
            color="#000"
          />
        </Container>
      </Row>

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .Search, input {
          width: 100% !important;
        }
      `}</style>
    </div>
  );
};

export default Search;