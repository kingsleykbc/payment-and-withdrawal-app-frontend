import React from 'react';

import IcDanger from 'react-icons/lib/md/clear';
import IcWarning from 'react-icons/lib/md/warning';
import IcSuccess from 'react-icons/lib/md/check';
import IcInfo from 'react-icons/lib/md/info-outline';
import Button from './Button';
import theme from '../../config/theme';
import { Par } from './TextComponents';
import CircularLoader from './CircularLoader';

const ResultPage = ({
  icon,
  iconColor,
  type,
  bottomActions,
  vPadding,
  title,
  subTitle,
  footer,
  showDefaultBottomButton,
  onDefaultBottomButtonClick
}) => {

  vPadding = vPadding || "10%";

  /**
   * ICON COLOE
   */
  iconColor = iconColor 
    ? iconColor
    : (type === "success") ? theme.colors.successColor
    : (type === "warning") ? theme.colors.warningColor
    : (type === "error") ? theme.colors.dangerColor
    : theme.colors.primaryColor;


  /**
   * ICON
   */
  icon = icon 
    ? icon
    : (type === "success") ? <div className="roundResultIcon"> <IcSuccess /> </div>
    : (type === "warning") ? <div className="roundResultIcon"> <IcWarning/> </div>
    : (type === "error") ? <div className="roundResultIcon"> <IcDanger /> </div>
    : (type === "loading") ? <div className="loader"> <CircularLoader color={iconColor} color2={theme.colors.textColor} /> </div>
    : <div className="roundResultIcon"> <IcInfo /> </div>;
  
  /**
   *  BOTTOM ACTIONS
   */
  bottomActions = bottomActions && bottomActions.length > 0
    ? bottomActions
    : (type === "error" && showDefaultBottomButton !== false) ? 
      [<Button color={theme.colors.dangerColor} onClick={onDefaultBottomButtonClick}>Retry</Button>]
    : (type === "success" && showDefaultBottomButton !== false) ? 
      [<Button color={theme.colors.successColor} onClick={onDefaultBottomButtonClick}>Proceed</Button>]
    : null;

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="ResultPage">

      {/* ICON */}
      <div className="iconSection"> {icon} </div>

      {/* TITLE */}
      <h2 className="title"> {title} </h2>

      {/* SUB TITLE */}
      <div className="subTitle">
        <Par lineHeight="26px" color={theme.colors.lightText}> {subTitle} </Par>
      </div>

      {/* BOTTOM ACTIONS */}
      {(bottomActions && bottomActions.length > 0) && 
        <div className="bottomActions">
          {bottomActions.map((item, index) => <div key={`bottomAction_${index}`} className="bottomActionWidget">{item}</div>)}
        </div>
      }

      {/* FOOTER */}
      {footer && <div className="footer">{footer}</div>}

      { /* STYLE */}
      <style jsx>{`
        .ResultPage {
          text-align: center;
          padding: ${vPadding} 20px;         
        }

        .iconSection {
          margin-bottom: 30px;
          font-size: 3.7rem;
          color: ${iconColor};
        }

        .iconSection :global(svg *){
          fill: ${iconColor};
        }

        .title {
          margin-bottom: 15px;
        }

        .subTitle {
          margin: auto;
          margin-bottom: 50px;
          max-width: 500px;
        }

        .ResultPage :global(.roundResultIcon) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 5px solid ${iconColor};
          width: 90px;
          height: 90px;
          border-radius: 100%;
        }

        .ResultPage :global(.roundResultIcon svg *) {
          fill: ${theme.colors.textColor};
        }

        .footer {
          margin-top: 40px;
        }

        .bottomActions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 5px 10px;
        }
        
        .bottomActionWidget {
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default ResultPage;