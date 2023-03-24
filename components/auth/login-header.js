import BackIcon from "../icons/back-icon";

const LoginHeader = () => {

  return (
    <div className="flex justify-between" id="loginHeader">
      <div className="m-2 text-left text-3xl">
        <h1>Sign In or Sign Up</h1>
        <div className="text-slate-500 italic text-base">
          <h1>
            Enter your details below...
          </h1>
        </div>
      </div>
      <div className="p-2">
        <BackIcon />
      </div>
    </div>
  )
}

export default LoginHeader;
