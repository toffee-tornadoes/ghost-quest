import "@/styles/globals.css";
import Layout from "@/components/layout";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  // Add a Layout component here
   const [supabase] = useState(() => createBrowserSupabaseClient())
  return (
    <Layout>
      <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />

    </SessionContextProvider>
    </Layout>

  );
}

