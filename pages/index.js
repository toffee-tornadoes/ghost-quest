import Head from "next/head";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

// HOME VIEW/ROOT

// Main Nav component - include this in Layout component
// User Icon Component - link to user-profile page
// Search Icon component - filter component
// Favorites Icon component - link to favorites page

// Displays pins of nearby locations (if there are any)

export default function Home({ locations }) {
  return (
    <>
      <Head>
        <title>GHOST QUEST</title>
        <meta name="description" content="Embark on a journey to hunt for ghosts across the country." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="ghost-quest-high-resolution-color-logo.png" />
      </Head>
      <div className="bg-black text-white flex flex-col">
        Welcome to Ghost Quest!
        <img src="ghost-quest-high-resolution-color-logo.png" alt="ghost quest logo" />
        <Link href={"/locations"}>Click Here</Link>
      </div>
    </>
  );
}
