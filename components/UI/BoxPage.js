import React from 'react';
import Container from './Container';
import theme from '../../config/theme';

const BoxPage = ({ children, bottomText, backdropColor, height, autoHeight, padding, width, responsiveWidth, isScrollablePage }) => {
  const maxWidth = width || "500px";
  const maxHeight = height ? height : autoHeight ? "none" : "300px";
  const mainHeight = autoHeight ? "auto" : "100%";
  const overflow = isScrollablePage ? "auto" : "visible";
  const display = isScrollablePage ? "block" : "flex";
  backdropColor = backdropColor || theme.colors.faintColor;
  padding = padding || '20px';
  responsiveWidth = responsiveWidth || "600px";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="BoxPage">
      <div className="boxWrapper"> 
        <Container className="board" borderRadius="5px" hasShadow padding={padding}> 
          {children} 
        </Container>      
        {bottomText && <div className="bottomText"> {bottomText} </div>}        
      </div>


      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .BoxPage{
          position: fixed;
          top: 0;
          left:0;
          bottom:0;
          right: 0;
          display:${display};
          overflow: ${overflow};
          align-items:center;
          justify-content: center;
          padding-top: 20px;
          padding-bottom: 20px;
          background: ${backdropColor};
        }

        .boxWrapper{
          width: 100%;
          height: ${mainHeight};
          max-height: ${maxHeight};
          max-width: ${maxWidth};
          padding: 10px;
          margin: auto;

        }

        .boxWrapper :global(.board){
          width: 100%;
          background: ${theme.colors.backgroundColor};
          height: 100%;
        }
        
        .bottomText {
          padding: 20px 0;
          text-align: center;
        }

        @media screen and (max-width: ${responsiveWidth}){
          .BoxPage{
            background: ${theme.colors.backgroundColor};
            display: block;
            overflow: auto;
            padding: 0;
            margin-top: 0;
          }

          .boxWrapper{
            height: auto;
            width: 100%;
            padding: 0;
          }

          .BoxPage :global(.board){
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default BoxPage;