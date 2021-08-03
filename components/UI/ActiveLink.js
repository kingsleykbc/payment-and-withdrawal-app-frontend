import React from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';

const Active = ({ router: { pathname }, children, className:cName, ...props }) => {

  let className = cName || null;

  const isActiveClass = (`/${pathname.split('/')[1]}` === props.href) && props.activeClassName;

  if (isActiveClass) className = `${className || ''} ${props.activeClassName}`.trim()

  delete props.activeClassName

  return <Link {...props}><a className={className}>{children}</a></Link>
}

export default withRouter(Active)