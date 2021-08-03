import React, { useState } from 'react';
import theme from '../../config/theme';
import DotLoader from './DotLoader';
import { getCloudinaryImageURL } from '../../functions/imageFunctions';

const Image = ({
  src,
  alt,
  lock,
  isSquare,
  placeholder,
  width,
  height,
  responsiveWidth,
  mobileWidth,
  backgroundColor,
  mobileHeight,
  display,
  brightness,
  serverImageWidth,
  isRounded,
  borderRadius,
  hasShadow,
  fit,
  fitPosition,
  isLoading
}) => {
  const [hasLoaded, sethasLoaded] = useState(false);

  /**
   * GET CSS
   */
  placeholder = placeholder || theme.defaultImage;
  width = width || "100px";
  height = isSquare ? width : (height) ? height : "auto";
  mobileWidth = mobileWidth || width;
  mobileHeight = isSquare ? mobileWidth : (mobileHeight) ? mobileHeight : height;
  borderRadius = (isRounded) ? "50%" : borderRadius ? borderRadius : "5px";
  display = display || "inline-block";
  fit = fit || "contain";
  fitPosition = fitPosition || "50% 50%";
  brightness = brightness || "100%";
  backgroundColor = backgroundColor || theme.colors.highlightColor;
  const boxShadow = (hasShadow) ? theme.boxShadows.smallShadow : "none";
  const minHeight = (hasLoaded || height !== "auto") ? "none" : width;
  
  // Width of image to be returned from cloudinary
  serverImageWidth = parseInt(serverImageWidth || width); 


  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="Image">
      {(src && (isLoading || !hasLoaded)) && <div className="loading"> <DotLoader /> </div>}
      {lock && <div className="lock"></div>}
      <img
        alt={alt}
        src={src ? getCloudinaryImageURL(src, serverImageWidth) : placeholder}
        ref={(input) => {
          if (!input) return;

          const img = input;
          const updateFunc = () => sethasLoaded(true);

          img.onload = updateFunc;
          if (img.complete) updateFunc();
          img.onload = null;
        }}
      />

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .Image {
          width: ${width};
          height: ${height};
          overflow: hidden;
          border-radius: ${borderRadius};
          background: ${backgroundColor};
          position: relative;
          display: inline-block;
          box-shadow: ${boxShadow};
          flex-grow: 0;
          flex-shrink: 0;
          vertical-align: middle;
          max-width: 100%;
          min-height: ${minHeight};
        }

        .loading, .lock {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${backgroundColor};
        }

        .lock {
          opacity: 0;
          z-index: 1;
        }

        img {
          width: 100%;
          height: 100%;
          vertical-align: middle;
          display: block;
          filter: brightness(${brightness});
          object-fit: ${fit};
          object-position: ${fitPosition};
        }

        @media screen ${`and`} (max-width: ${responsiveWidth || "800px"}){
          .Image {
            width: ${mobileWidth};
            height: ${mobileHeight};
          }
        }   
      `}</style>
    </div>
  );
};

export default Image;