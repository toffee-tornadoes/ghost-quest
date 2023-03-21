import "@/styles/globals.css";
import Layout from "@/components/layout";
import { supabase } from "@/lib/supabaseClient";

export default function App({ Component, pageProps }) {
  // Add a Layout component here
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
