import React from 'react';
import ReactCarousel from "react-multi-carousel";
import theme from '../../config/theme';
import { Text } from '../UI/TextComponents';

const Carousel = ({ children, showDots, showArrows, hideArrowsOnResponsive, responsiveWidth, infinite, autoPlay, ssr = true }) => {
  /**
   * GET CSS
   */
  const mobileArrowDisplay = (hideArrowsOnResponsive) ? "none" : "block";

  /**
   * CONFIG
   */
  const responsive = {
    desktop: {
      breakpoint: { max: 10000, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="Carousel" >
      <ReactCarousel
        showDots={true}
        arrows={showArrows}
        responsive={responsive}
        ssr={ssr}
        autoPlay={autoPlay}
        showDots={showDots !== false}
        infinite={infinite !== false}
        autoPlaySpeed={3500}
        keyBoardControl={true}
        transitionDuration={500}
        dotListClass="dots"
        containerClass="slider"
      >
        {children || <div className="default"> <Text color={theme.colors.lightText}> No Data </Text></div>}
      </ReactCarousel>

      { /* STYLE ======================================================================================= */}
      <style jsx>{`      
        .Carousel :global(.slider) {
          background: ${theme.colors.highlightColor};
        }

        .Carousel :global(.dots) {
          bottom: 15px;
        }

        .Carousel :global(.dots button){
          border-color: #fff;
          background: none;
        }

        .Carousel :global(.react-multi-carousel-dot--active button){
          background: #fff;
        }

        .default {
          text-align: center;
          padding: 8%;
        }

        .Carousel :global(.react-multiple-carousel__arrow) {
          background: none;
        }

        .Carousel :global(.react-multiple-carousel__arrow:hover) {
          opacity: 0.5;
        }

        @media screen ${`and`} (max-width: ${responsiveWidth || "800px"}){
          .Carousel :global(.react-multiple-carousel__arrow) {
            display: ${mobileArrowDisplay};
          }
        }   

      `}</style>
    </div>
  );
};

export default Carousel;