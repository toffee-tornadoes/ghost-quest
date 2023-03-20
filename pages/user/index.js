// ghostquest.com/user/

const { default: LoginForm } = require("@/components/auth/login-form");
const { default: LoginHeader } = require("@/components/auth/login-header");
const { Fragment } = require("react");

// Auth UI component - IF user is not logged in... display
// Login or Sign-in component

const UserLoginPage = () => {
  return (
    <Fragment>
      <LoginHeader />
      <LoginForm />
    </Fragment>
  );
};

export default UserLoginPage;
