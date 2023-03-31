const { default: LoginForm } = require("@/components/auth/login-form");
const { default: LoginHeader } = require("@/components/auth/login-header");
const { Fragment } = require("react");

const UserLoginPage = () => {
  return (
    <Fragment>
      <LoginHeader />
      <LoginForm />
    </Fragment>
  );
};

export default UserLoginPage;
