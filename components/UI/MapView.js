import React, { useRef, useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GOOGLE_API_KEY } from '../../config/config';
import { GOOGLE_MAPS_STYLE } from '../../config/googleMapsStyle';
import theme from '../../config/theme';
import CircularLoader from './CircularLoader';
import { IconText } from './TextComponents';


// =======================================================================
//  THE MAP COMPONENT
// =======================================================================
const RegularMap = withScriptjs(
  withGoogleMap(
    ({ zoom, defaultCenter, markers, freeScroll, lockScroll, fitMarkers }) => {

      /**
       * SETUP OPTIONS 
       */
      const mapRef = useRef(null);
      const scrollwheel = freeScroll ? true : lockScroll ? false : null;
      const defaultOptions = { scrollwheel, options: { styles: GOOGLE_MAPS_STYLE } };


      /**
       * HANDLE FIT BOUNDS
       */
      const fitBounds = () => {
        const bounds = new window.google.maps.LatLngBounds();
        markers.map(item => {
          bounds.extend(item.position);
          return item.id
        });
        mapRef.current.fitBounds(bounds);
      };

      /**
       * GET THE MAP TO FIT MARKERS
       */
      useEffect(() => {
        if (fitMarkers) fitBounds();
      }, [markers]);

      /**
       * GET MARKERS
       */
      const markersWidgets = markers.map(
        ({ position: { long, lng, lat } }, index) => <Marker key={`marker_${index}`} position={{ lat, lng: lng || long }} />
      );

      // =======================================================================
      //  UI
      // =======================================================================
      return (
        <GoogleMap
          ref={mapRef}
          defaultZoom={zoom}
          defaultCenter={defaultCenter}
          defaultOptions={defaultOptions}
        >
          {markersWidgets}
        </GoogleMap>
      );
    })
);

const mapElementStyle = { height: '100%' };


// =======================================================================
//  THE MAIN COMPONENT
// =======================================================================
const MapView = ({
  width, height, mobileWidth, mobileHeight, freeScroll, lockScroll, responsiveWidth, defaultCenter, zoom, loader, markers, fitMarkers
}) => {
  
  /**
   * MAP SETTINGS
   */
  zoom = zoom || 15;
  loader = loader || <div className="mapLoader"> <IconText icon={<CircularLoader size="2rem" />} isBold isLightText> Loading Map</IconText> </div>
  markers = markers || [];
  
  defaultCenter = defaultCenter || { lat: 6.4454594, lng: 3.449074 };
  if (!defaultCenter.lng) defaultCenter.lng = defaultCenter.long; // Reformat for google maps

  /**
   * CSS
   */
  height = height || "400px";
  width = width || "100%";
  mobileWidth = mobileWidth || width;
  mobileHeight = mobileHeight || height;
  responsiveWidth = responsiveWidth || "800px";

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="MapView">
      <RegularMap
        zoom={zoom}
        defaultCenter={defaultCenter}
        markers={markers}
        freeScroll={freeScroll}
        lockScroll={lockScroll}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`}
        loadingElement={loader}
        fitMarkers={fitMarkers}
        containerElement={<div className="mapContainer" />}
        mapElement={<div className="map" style={mapElementStyle} />}
      />

      { /* STYLE */}
      <style jsx>{`
        .mapContainer, .MapView :global(.mapLoader) {
          min-width: 250px;
          width: ${width};
          height: ${height};
          border-radius: 5px;
          overflow: hidden;
          box-shadow: ${theme.boxShadows.medShadow};
        }

        .MapView :global(.mapLoader) {
          background: ${theme.colors.highlightColor};
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 25px;
        }

        @media screen and (max-width: ${responsiveWidth}){
          .mapContainer, .MapView :global(.mapLoader) {
            width: ${mobileWidth};
            height: ${height};
          }
        }
      `}</style>
    </div>
  );
}

export default MapView;
