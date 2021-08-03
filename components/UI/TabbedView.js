import React, { useState } from 'react';
import classnames from 'classnames';
import theme from '../../config/theme';

const TabbedView = ({ 
  label1, label2, label3, label4, view1, view2, view3, view4, onChangeView, minHeight, viewPadding,
  borderColor, activeBorderColor, fontWeight, activeFontWeight, color, activeColor, tabsShadow
}) => {
  /**
   * CSS
   */
  color = color || theme.colors.textColor;
  activeColor = activeColor || theme.colors.textColor;
  minHeight = minHeight || "200px";
  viewPadding = viewPadding || "15px";
  tabsShadow = tabsShadow ? theme.boxShadows.medShadow : "none";
  borderColor = borderColor ? borderColor : (tabsShadow !== "none") ? "transparent" : theme.colors.highlightColor;
  activeBorderColor = activeBorderColor || theme.colors.primaryColor;

  const [currentView, setCurrentView] = useState(1);

  /** 
  * SET THE CURRENT VIEW
  */
  const setView = (viewIndex) => {
    setCurrentView(viewIndex);
    if (onChangeView) onChangeView(viewIndex);
  }

  /**
  * SET THE LABEL CLASS NAME
  */
  const labelClassName = (view) => classnames(["label", { "active": currentView === view }]);

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="TabbedView">

      {/* THE NAV */}
      <nav className="nav">
        <div className={labelClassName(1)} onClick={() => setView(1)}>{label1}</div>
        <div className={labelClassName(2)} onClick={() => setView(2)}>{label2}</div>
        {label3 && <div className={labelClassName(3)} onClick={() => setView(3)}>{label3}</div>}
        {label4 && <div className={labelClassName(4)} onClick={() => setView(4)}>{label4}</div>}
      </nav>

      {/* THE VIEWS */}
      <div className="views">
        {currentView === 1 && view1}
        {currentView === 2 && view2}
        {currentView === 3 && view3}
        {currentView === 4 && view4}
      </div>

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .TabbedView {
          background: ${theme.colors.backgroundColor};
        }

        .TabbedView .nav {
          display:flex;
          align-items:center;
          box-shadow: ${tabsShadow};
        }

        .TabbedView .label{
          flex-grow: 1;
          text-align: center;
          font-weight: ${fontWeight || "normal"};
          padding: 15px;
          cursor: pointer;
          transition: all linear 0.25s;
          border-bottom: 2px solid ${borderColor};
          color: ${color};
        }

        .TabbedView .label:hover{
          background: ${theme.colors.highlightColor};
        }

        .TabbedView .label.active {
          font-weight: ${activeFontWeight || "bold"};
          border-bottom-color: ${activeBorderColor};
          color: ${activeColor};
        }

        .TabbedView .label.active:hover {
          background: none;
        }

        .TabbedView .views{
          padding: ${viewPadding};
          min-height: ${minHeight};
        }
      `}</style>
    </div>
  );
};

export default TabbedView;