import { NextUIProvider } from "@nextui-org/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import ArcadiaNavbar from "~/components/ArcadiaNavbar";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "~/styles/globals.css";
import Script from "next/script";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-0S7BZS3V6Z" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-0S7BZS3V6Z');
        `}
      </Script>
      <SessionProvider session={session}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <ArcadiaNavbar />
            <Component {...pageProps} />
          </NextThemesProvider>
        </NextUIProvider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
