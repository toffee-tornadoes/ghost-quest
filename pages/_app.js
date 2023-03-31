import "@/styles/globals.css";
import Layout from "@/components/layout";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { store } from "@/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  // Add a Layout component here
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionContextProvider>
    </Provider>
  );
}
