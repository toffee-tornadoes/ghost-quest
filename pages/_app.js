import "@/styles/globals.css";
import Layout from "@/components/layout";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  // Add a Layout component here
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionContextProvider>
    </Provider>
  );
}
