import React, { useState } from 'react';
import Button from './Button';
import Lightbox from './Lightbox';

const ButtonLightbox = ({ children, content, label, buttonProps, showTitle, title, ...lightboxProps }) => {
  const [showLB, setshowLB] = useState(false);
  const toggleshowLB = () => setshowLB(!showLB);

  /**
   * STYLES AND CONFIG
   */
  content = content || children;
  title = showTitle === false ? null : title || label;

  // ================================================================================================
  //  UI
  // ================================================================================================
  return (
    <>
      <Button onClick={toggleshowLB} filled={true} {...buttonProps}>{label}</Button>

      <Lightbox show={showLB} toggle={toggleshowLB} title={title} {...lightboxProps}>
        {(typeof content === "function") ? content({ show: showLB, toggle: toggleshowLB }) : content}
      </Lightbox>
    </>
  );
};

export default ButtonLightbox;