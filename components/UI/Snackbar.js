/**
* UPDATED BETTER SNACKBAR COMPONENT
*/
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import theme from '../../config/theme';

import IcDanger from 'react-icons/lib/md/cancel';
import IcWarning from 'react-icons/lib/md/warning';
import IcSuccess from 'react-icons/lib/md/check-circle';
import IcInfo from 'react-icons/lib/md/info-outline';

class Snackbar extends PureComponent {
  message = "Snackbar";
  type = "";
  showIcon = true;
  position = "top";
  icon;
  color;

  state = { isActive: false }

  /**
  * HANDLE OPEN SNACKBAR
  */
  openSnackbar = ({message = "Snackbar", type = "", showIcon, position = "top", icon, color }) => {
    this.message = message;
    this.type = type;
    this.showIcon = showIcon;
    this.position = position === "bottom" ? "bottom" : "top";
    this.icon = icon;
    this.color = color;

    this.setState({ isActive: true }, () => setTimeout(() => this.setState({ isActive: false }), 3000));
  }

  // =======================================================================
  //  RENDER
  // =======================================================================
  render() {
    const background = this.color
      ? this.color
      : (this.type === "error") ? theme.colors.dangerColor
      : (this.type === "success") ? theme.colors.successColor
      : (this.type === "warning") ? theme.colors.warningColor
      : theme.colors.backgroundColor;

    /**
    * Get the ClassName
    */
    const { isActive } = this.state;
    const className = classnames({ Snackbar: true, show: isActive, hide: !isActive });
    const mainIcon = this.icon 
      ? this.icon
      : (this.type === "error") ? <IcDanger />
      : (this.type === "success") ? <IcSuccess/>
      : (this.type === "warning") ? <IcWarning/>
      : <IcInfo/>
    const fontWeight = (background === theme.colors.backgroundColor) ? "normal" : "bold"; 
    const iconColor = (background === theme.colors.backgroundColor) ? theme.colors.primaryColor : "#fff";
    const textColor = (background === theme.colors.backgroundColor) ? theme.colors.textColor : "#fff";

    // =======================================================================
    //  UI
    // =======================================================================
    return (
      <div className={className}> 
        {(this.showIcon !== false) && <div className="icon"> {mainIcon} </div>}
        <div className="message"> {this.message} </div>
        

        { /* STYLE */}
        <style jsx>{`
          .Snackbar {
            visibility: hidden;
            border-radius: 5px;
            padding: 16px 20px;
            padding-right: 27px;
            position: fixed;
            z-index: 15;
            left: 50%;
            transform: translateX(-50%);
            background: ${background};
            box-shadow: ${theme.boxShadows.medShadow};
            display: flex;
            align-items: center;
            ${this.position}: 80px;
          }

          .Snackbar .icon {
            font-size: 1.5em;
            margin-top: -3px;
            margin-right: 10px;
          }


          .message {
            font-weight: ${fontWeight};
            color: ${textColor};
          }

          .Snackbar :global(svg *){
            fill: ${iconColor};
          }

          .show {
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
            visibility: visible;

          }

          @keyframes fadein {
            ${`from`} { ${this.position}: 0; opacity: 0;}
            to { ${this.position}: 80px; opacity: 1; }
          }

          @keyframes fadeout {
            ${`from`} { ${this.position}: 80px; opacity: 1;}
            ${`to`} { ${this.position}: 0; opacity: 0;}
          }
        `}</style>  
      </div>
    );
  }
}

export default Snackbar;