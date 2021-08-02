import React, { Component, createContext } from 'react';
import IcError from 'react-icons/lib/md/cancel';
import IcSuccess from 'react-icons/lib/md/check-circle';
import classnames from 'classnames';
import theme from '../config/theme';

export const FlashContext = createContext();

class FlashContextProvider extends Component {
  state = {
    message: null
  }

  /**
   * SET FLASH MESSAGE
   */
  setFlashMessage = message => {
    this.setState({ message });

    if (message.temporary) setTimeout(() => { this.removeFlashMessage() }, 5000);
  }

  /**
   * REMOVE FLASH MESSAGE
   */
  removeFlashMessage = () => {
    this.setState({ message: null });
  }

  // =======================================================================
  //  RENDER
  // =======================================================================
  render() {
    const { message } = this.state;
    const { children } = this.props;
    let icon, className, text, type;

    if (message) {
      const { type:typ, message: msg } = message;
      type = typ;
      text = msg;
      icon = (type === "success") ? <IcSuccess/> : <IcError/>;
      className = classnames(["message", type ]);
    }

    // =====================================================================
    //  UI
    // =====================================================================
    return (
      <FlashContext.Provider value={{ ...this.state, setFlashMessage: this.setFlashMessage }}>
        {message && 
          <div className={className}>
            <div className="icon"> {icon} </div>
            <div className="text"> {text} </div>
            <div className="cancel" onClick={this.removeFlashMessage}> &times; </div>
          </div>
        }

        {children}

        { /* STYLE ======================================================================================= */}
        <style jsx>{`
          .message {
            display: flex;
            position: fixed;
            align-items: center;
            top: 60px;
            width: 100%;
            padding: 0 15px;
            height: 50px;
            z-index: 2000;
            box-shadow: ${theme.boxShadows.smallShadow};
            background: ${type === "success" ? theme.colors.successColor : theme.colors.dangerColor};
            font-weight: bold;
            color: #fff;
          }

          .icon {
            margin-right: 15px;
            font-size: 1.5rem;
            margin-top: -5px;
          }
          
          .icon :global(svg *) {
            fill: #fff;
          }

          .text {
            color: #fff;
            flex-grow: 1;
          }

          .cancel {
            margin-left: 15px;
            font-size: 1.5rem;
            cursor: pointer;
            color: #fff;
          }
          .cancel:hover {
            opacity: 0.5;
          }
        `}</style>
      </FlashContext.Provider>
    );
  }
}

export default FlashContextProvider;
