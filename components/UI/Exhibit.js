import React from 'react';
import Container from './Container';
import { Column, Flex } from './Flex';
import { Text } from './TextComponents';

const Exhibit = (
  {contentPadding, minHeight, label, borderRadius, children, margin, hasBorder, hasShadow, background, marginHorizontal, marginVertical}
) => {
  return (
    <Container 
      minHeight={minHeight}
      height="100%"
      margin={margin || "5px"} 
      hasBorder={hasBorder} 
      hasShadow={(hasShadow !== false) && true}
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
      borderRadius={borderRadius || "5px"}
    >
      <Column stretchChildren fillHeight>
        
        {/* ITEM */}
        <Flex crossSpan="stretch" span={1}>
          <Container 
            height="100%" 
            padding={contentPadding || "20px"} 
            background={background} 
            className="item" 
            responsivePadding="10px"
            responsiveWidth="400px"
            align="center"
          >
            {children}
          </Container>
        </Flex>

        {/* LABEL */}
        <Container className="label" hasBorder={true} borderDirections="t" padding="20px">
          <Text fontWeight="bold"> {label} </Text>
        </Container>
      </Column>
    </Container>
  );
};

export default Exhibit;