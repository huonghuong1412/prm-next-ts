import type { AppProps } from 'next/app'
import React, { useEffect } from 'react';
import { SessionProvider } from "next-auth/react"
import '../styles/slick.min.css';
import '../styles/slick-theme.css';
import "react-responsive-modal/styles.css";
import 'react-medium-image-zoom/dist/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/globals.css';
import '../styles/style.css';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 86400000);
    return () => clearTimeout(timer);
  }, []);

  return <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>
}

export default MyApp
