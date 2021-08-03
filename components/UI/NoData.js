import React from 'react';
import classnames from 'classnames';
import ResultPage from './ResultPage';
import theme from '../../config/theme';
import { Text } from './TextComponents';
import IcEmpty from 'react-icons/lib/md/collections-bookmark';


const NoData = ({icon, message, subMessage, vPadding, className }) => {
  const cName = classnames(["NoData",{[className]: className }]);
  message = message || "No Data";
  icon = icon || <IcEmpty />;
  
  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className={cName}>
      <ResultPage
        vPadding={vPadding}
        iconColor={theme.colors.lightestText}
        icon={icon}
        title={<Text fontWeight="bold" fontSize="1.1rem" color={theme.colors.lightText}> {message} </Text> }
        subTitle={subMessage}
      />

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .NoData {
          text-align: center !important;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default NoData;