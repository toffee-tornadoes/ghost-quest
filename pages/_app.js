import "@/styles/globals.css";
import Layout from "@/components/layout";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { store } from "@/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Layout>
          <Head>
            {" "}
            <title>GHOST QUEST</title>
            <meta
              name="description"
              content="Embark on a journey to hunt for ghosts across the country."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link
              rel="icon"
              type="image/svg+xml"
              href="ghost-quest-high-resolution-color-logo.png"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={true}
          theme="dark"
        />
      </SessionContextProvider>
    </Provider>
  );
}
