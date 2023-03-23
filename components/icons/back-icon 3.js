import { useRouter } from "next/router";

const BackIcon = () => {
  const router = useRouter()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      onClick={()=>{router.back()}}
      stroke="grey"
      className="w-9 h-9 hover:cursor-pointer hover:stroke-orange-700"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default BackIcon;
