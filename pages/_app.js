import Head from "next/head";

import "../styles/globals.css";
import Layout from "../layout/layout";
import StoreProvider from "../context/StoreItemsContext";
import { Provider as CartProvider } from "../context/CartContext";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <CartProvider>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </StoreProvider>
  );
}

export default MyApp;
