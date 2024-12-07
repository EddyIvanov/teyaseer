import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { envVars } from '@/configs/env';

const Favicon = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ec972d" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff"></meta>
  </>
);

const Document = (props: any) => {
  const { __NEXT_DATA__: nextData } = props;
  const { locale } = nextData;
  return (
    <Html dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale} id="html">
      <Head>
        <Favicon />
        <Script
          id={envVars.NEXT_PUBLIC_GA_ID}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${envVars.NEXT_PUBLIC_GA_ID}');
          `,
          }}
        />
        {!envVars.ONLY_UAT_FEATURES_ENABLED && (
          <Script
            id="ms_clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "nfxa1a7ogv");
          `,
            }}
          />
        )}
        <meta
          name="google-site-verification"
          content="4fwrBOUNS-m0RL8rcwwkfpv7fd4QA5rr8KAotMtriPA"
        />
      </Head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${envVars.NEXT_PUBLIC_GA_ID}`}
            height={0}
            width={0}
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default Document;
