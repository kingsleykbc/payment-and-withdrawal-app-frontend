import React, { PureComponent } from 'react';
import Lightbox from './Lightbox';
import ResultPage from './ResultPage';

class ResultPageBox extends PureComponent {
  /**
   * DEFAULT VALUES
   */
  type = "error";
  title = "Title";
  subTitle = "Sub title";
  bottomActions = null;
  icon = null;
  isFullScreen = false;
  isFixed = false;
  onDefaultBottomButtonClick = null;

  /**
   * STATE
   */
  state = { show: false }

  /**
   * TOGGLE
   */
  toggle = () => this.setState({ show: !this.state.show });

  /**
   * ADD SHATUS
   */
  openResultPage = ({ type, title, subTitle, bottomActions, icon, isFullScreen, isFixed, onDefaultBottomButtonClick }) => {
    this.type = type;
    this.title = title;
    this.subTitle = subTitle;
    this.bottomActions = bottomActions;
    this.icon = icon,
      this.isFullScreen = isFullScreen;
    this.isFixed = isFixed;
    this.onDefaultBottomButtonClick = onDefaultBottomButtonClick;

    this.toggle();
  }

  /**
   * CLOSE BOX
   */
  closeResultPage = () => this.setState({ show: false });


  // =======================================================================
  //  RENDER
  // =======================================================================
  render() {
    const { show } = this.state;

    // =======================================================================
    //  UI
    // =======================================================================
    return (
      <Lightbox
        show={show}
        isFixed={this.isFixed}
        isFullScreen={this.isFullScreen}
        toggle={this.toggle}
        autoHeight
        contentPadding="0"
      >
        <ResultPage
          type={this.type}
          title={this.title}
          subTitle={this.subTitle}
          bottomActions={this.bottomActions}
          onDefaultBottomButtonClick={this.onDefaultBottomButtonClick}
          icon={this.icon}
          vPadding={this.isFullScreen && "5%"}
        />
      </Lightbox>
    );
  }
}

export default ResultPageBox;