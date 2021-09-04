import { useEffect } from 'react';
import nextCookie from 'next-cookies';
import Router from 'next/router';

const auth = ctx => {
  const { token } = nextCookie(ctx);
  if (token) return token;

  // If there's no token, it means the user is not logged in.
  if (typeof window === 'undefined') {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
  }
  else Router.push('/login');
  return token;
}

/**
 * HANDLE PROTECTED ROUTE AUTHENTICATION
 */
const withAuth = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') Router.push('/login')
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)
      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])
    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx)
    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))
    return { ...componentProps, token }
  }
  return Wrapper;
}

export default withAuth;