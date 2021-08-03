import React from 'react';
import SectionContent from '../UI/SectionContent';
import Container from '../UI/Container';
import { Row } from './Flex';
import Spacing from './Spacing';

const TitlePage = ({ title, children, maxWidth, edgeWidget, titleFontSize, vPadding }) => {
  vPadding = vPadding || "20px";
  titleFontSize = titleFontSize || "1.3rem";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="TitlePage">
      <SectionContent vPadding={vPadding} maxWidth={maxWidth}>

        {/* TITLE */}
        <Container paddingVertical="15px" hasBorder borderDirections="b" marginBottom="20px">
          <Row justify="space-between">
            <Spacing padding="0 10px 0 0"> <h2> {title} </h2> </Spacing>
            {edgeWidget}
          </Row>
        </Container>

        {/* CONTENT */}
        <Container minHeight="70vh">
          {children}
        </Container>
      </SectionContent>

      { /* STYLE */}
      <style jsx>{`
        h2 {
          font-size: ${titleFontSize};
        }
      `}</style>
    </div>
  );
};

export default TitlePage;