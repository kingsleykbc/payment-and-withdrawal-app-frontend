import React from 'react';
import Link from 'next/link';
import Button from './Button';

const LinkButton = ({as, href, ...buttonProps}) => {
  return  <Link as={as} href={href}><a>
    <Button {...buttonProps}/>
  </a></Link>

};

export default LinkButton;