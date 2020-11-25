import "assets/sass/app.scss";
import { HeaderContainer } from "containers/HeaderContainer/HeaderContainer";
import NextHead from "next/head";
import GoogleFonts from "next-google-fonts";
import {StateProvider} from "contexts/Contacts";


import type { AppProps /*, AppContext */ } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"/>
      <NextHead>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <title>Ubook</title>
      </NextHead>
      <StateProvider>
        <HeaderContainer />
        <Component {...pageProps} />
      </StateProvider>
    </>
  );
};

export default MyApp;
