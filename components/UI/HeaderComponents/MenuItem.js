import React from 'react';
import theme from '../../../config/theme';
import Container from '../Container';

const MenuItem = ({hasDivider, children, className, padding }) => {
  /**
   * GET CSS
   */
  const border = hasDivider === false ? "none" : `1px solid ${theme.colors.borderColor}`;

  return (
    <div className={`MenuItem ${className}`}>
      <Container padding={padding}>
        {children}
      </Container>

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .MenuItem{
          display: block;
          border-right: ${border};
          padding-right: 10px;
          margin-right: 10px;
        }

        @media screen and (max-width: 800px){
          .MenuItem {
            border-right: none;
            margin-right: 0;
            border-bottom: ${border}
          }
        }
      `}</style>
    </div>
  );
};

export default MenuItem;