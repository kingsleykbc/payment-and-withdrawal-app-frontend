import React from 'react';
import Link from 'next/link';
import TextButton from './TextButton';

const LinkTextButton = ({ as, href, isNewTab, target, ...buttonProps }) => {
  target = target ? target : isNewTab ? "blank" : "";

  return <Link as={as} href={href}><a target={target}>
    <TextButton {...buttonProps} />
  </a></Link>

};

export default LinkTextButton;