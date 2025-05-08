import '../styles/global.css';
import Head from 'next/head';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker зарегистрирован'))
        .catch(err => console.error('Service Worker ошибка:', err));
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fbd3e9" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
