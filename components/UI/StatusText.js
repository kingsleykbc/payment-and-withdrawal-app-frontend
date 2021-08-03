import React, { PureComponent, useEffect } from 'react';
import theme from '../../config/theme';

import IcDanger from 'react-icons/lib/md/cancel';
import IcWarning from 'react-icons/lib/md/warning';
import IcSuccess from 'react-icons/lib/md/check-circle';
import IcInfo from 'react-icons/lib/md/info-outline';

export default class StatusText extends PureComponent {

  state = { statusList: [] }

  /**
   * GET INTIIAL STATUSES
   */
  componentDidMount() {
    const statusList = this.props.initialStatusList.map((item, index) => ({...item, index}));

    this.setState({statusList})
  }
  

  /**
   * ADD SHATUS
   */
  showStatus = (details) => {
    const { statusList } = this.state;
    const index = statusList.length === 0 ? 0 : statusList[statusList.length - 1].index + 1;

    this.setState({
      statusList: [ ...statusList, { ...details, duration: details.duration || 3000, index }]
    });
  }

  /**
   * REMOVE STATUS
   */
  removeStatus = (index) => {
    const statusList = this.state.statusList.filter((item)=> item.index !== index);
    this.setState({ statusList });
  }

  // =======================================================================
  //  RENDER
  // =======================================================================
  render() {
    const {statusList} = this.state;

    const statusListWidgets = statusList.map(
      (item, index) => <Status key={index} {...item} onDismiss={()=> this.removeStatus(item.index)}>{item.message}</Status>
    );
    
    // =======================================================================
    //  UI
    // =======================================================================
    return (<div> {statusListWidgets} </div>)
  }
}

/**
 * STAT TEXT
 */
export const Status = ({ 
  children, 
  icon, 
  showIcon,
  index, 
  type,
  isFixed, 
  duration,
  filled,
  textColor,
  maxWidth, 
  fontWeight,
  color,
  showCancelButton, 
  borderRadius,
  vMargin,
  hasShadow,
  action, 
  onActionClick, 
  onDismiss
}) => {

  /**
   * REMOVE AFTER 3 SECONDS
   */
  if (duration && !isFixed){
    useEffect(() => {
      setTimeout(() => onDismiss(index), duration)
    }, []);
  }

  const handleDismiss = onDismiss ? () => onDismiss(index) : null;

  /**
   * SETUP CSS
   */
  vMargin = vMargin || "10px";
  maxWidth = maxWidth || "none";
  borderRadius = borderRadius || "5px";
  color = color 
    ? color
    : (type === "danger") ? theme.colors.dangerColor
    : (type === "success") ? theme.colors.successColor
    : (type === "warning") ? theme.colors.warningColor
    : theme.colors.primaryColor;
  const backgroundColor = filled ? color : "none";
  const iconColor = (filled) ? "#fff" : color;
  textColor = textColor ? textColor : iconColor;
  fontWeight = fontWeight
    ? fontWeight
    : (filled) ? "bold"
    : "normal";
  const boxShadow = hasShadow ? theme.boxShadows.medShadow : "none";

  icon = (showIcon === false) ? null
  : icon ? icon
  : (type === "danger") ? <IcDanger />
  : (type === "warning") ? <IcWarning />
  : (type === "success") ? <IcSuccess />
  : <IcInfo/>
  

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="Status">
      {icon && <div className="icon">{icon}</div>}

      <div className="message">{children}</div>

      {action && <div className="action" onClick={onActionClick}>{action}</div>}
      {(showCancelButton !== false) && <div className="cancelButton" onClick={handleDismiss}> &times; </div>}

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .Status {
          display: flex;
          align-items: center;
          max-width: ${maxWidth};
          border: 1px solid ${color};
          border-radius: ${borderRadius};
          padding: 12px 20px;
          margin: ${vMargin} 0;
          font-weight: ${fontWeight};
          background: ${backgroundColor};
          min-height: 54px;
          box-shadow: ${boxShadow};
        }

        .message {
          color: ${textColor};
          flex-grow: 1;
        }

        .cancelButton {
          color: ${textColor};
          font-size: 1.5em;
          cursor: pointer;
        }

        .cancelButton:hover, .action:hover{
          opacity: 0.8;
        }

        .icon {
          font-size: 1.6rem;
          margin-top: -3px;
          margin-right: 12px;
        }

        .Status :global(svg *){
          fill: ${iconColor};
        }

        .action {
          color: ${iconColor};
          margin:0 12px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
