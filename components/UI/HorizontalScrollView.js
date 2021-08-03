import React, { useRef, useState, useEffect } from 'react';
import theme from '../../config/theme';
import IcLeft from 'react-icons/lib/md/keyboard-arrow-left';
import IcRight from 'react-icons/lib/md/keyboard-arrow-right';

const HorizontalScrollView = ({
  scrollWidth,
  children,
  margin,
  responsiveHideArrows,
  responsiveWidth,
  responsiveMargin,
  backgroundColor
}) => {

  /**
   * STYLES
   */
  backgroundColor = backgroundColor || theme.colors.backgroundColor;
  margin = margin || "0";
  responsiveWidth = responsiveWidth || "800px";
  responsiveMargin = responsiveMargin || margin;

  /**
   * HANDLE SCROLLS
   */
  const parentRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [showingArrows, setShowingArrows] = useState(["right"]);

  useEffect(() => {
    let newWidth = parentRef.current ? parentRef.current.clientWidth : "none";
    setParentWidth(newWidth);
  }, [parentRef]);

  /**
   * HANDLE LEFT SCROLL
   */
  const handleLeftScroll = () => {
    let scrollDistance = scrollWidth || (parentWidth - (parentWidth * 0.2));
    const nextScroll = parentRef.current.scrollLeft - scrollDistance;

    if (nextScroll < 0) {
      setShowingArrows(["right"]);
      scrollDistance = parentRef.current.scrollLeft;
    }
    else setShowingArrows(["left", "right"]);
    parentRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
  }

  /**
   * HANDLE RIGHT SCROLL
   */
  const handleRightScroll = () => {
    let scrollDistance = scrollWidth || (parentWidth - (parentWidth * 0.2));
    const maxScroll = parentRef.current.scrollWidth - parentRef.current.clientWidth;
    const nextScroll = parentRef.current.scrollLeft + scrollDistance;

    if (nextScroll > maxScroll) {
      setShowingArrows(["left"]);
      scrollDistance = maxScroll - parentRef.current.scrollLeft;
    }
    else setShowingArrows(["left", "right"]);
    parentRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  }

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="HorizontalScrollView">
      <div className="container" ref={parentRef}>
        {(showingArrows.indexOf("left") !== -1) && <div className="scrollButton left" onClick={handleLeftScroll}> <IcLeft /> </div>}
        {(showingArrows.indexOf("right") !== -1) && <div className="scrollButton right" onClick={handleRightScroll}> <IcRight /> </div>}
        <div className="child"> {children} </div>
      </div>

      {/* STYLE */}
      <style jsx>{`
        .HorizontalScrollView {
          position: relative;
          white-space: nowrap;
          margin: ${margin};
        }

        .container {
          height: 100%;
          overflow: auto;
          overflow-scrolling: touch;
          padding: 10px;
          margin: 0 25px;
          background: ${backgroundColor};
        }

        .container::-webkit-scrollbar {
          width: 0px;  
          height: 0px;
          background: transparent; 
        }

        .scrollButton {
          position: absolute;
          top: 50%;
          left: 0px;
          transform: translateY(-50%);
          background: ${theme.colors.backgroundColor};
          cursor: pointer;
          height: 50px;
          z-index: 100;
          width: 50px;
          box-shadow: ${theme.boxShadows.smallShadow};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8em;
          transition: background linear 0.3s;
        }

        .scrollButton:hover {
          background: #000;
        }

        .right {
          left: auto;
          right: 0px;
        }

        .child {
          display: inline-flex;
          flex-wrap: nowrap;
        }

        .child :global(*){
          flex-shrink: 0;
        }

        .scrollButton :global(svg *){
          fill: ${theme.colors.primaryColor};
        }

        .scrollButton:hover :global(svg *){
          fill: #fff;
        }

        @media screen ${`and`} (max-width: ${responsiveWidth}){
          .container {
            margin: ${responsiveHideArrows ? "0" : "0 25px"};
          }

          .HorizontalScrollView {
            margin: ${responsiveMargin};
          }

          .scrollButton {
            display: ${responsiveHideArrows ? "none" : "flex"};
          }
        }
      `}</style>
    </div>
  );
};

export default HorizontalScrollView;