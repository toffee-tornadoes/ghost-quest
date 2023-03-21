import "@/styles/globals.css";
import Layout from "@/components/layout";

// fetch haunted house locations from supabase
export const getServerSideProps = async () => {
  const { data } = await supabase.from("locations").select();
  return {
    props: {
      locations: data,
    },
  };
};

export default function App({ Component, pageProps, locations }) {
  // Add a Layout component here
  // console.log(locations);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
