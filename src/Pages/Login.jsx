import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [loginData, setloginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  // setUserLogged(JSON.parse(localStorage.getItem("loginData")));

  const handleLogin = async (googleData) => {
    setloginData(googleData);
    localStorage.setItem("loginData", JSON.stringify(googleData.profileObj));
    history.push("/");
  };

  const handleFailure = (result) => {
    // alert(result);
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center relative">
      <img
        className="object-cover absolute bottom-0 md:h-screen w-full opacity-50"
        src="/assets/landing.png"
        alt=""
      />
      <div className="flex items-center flex-col space-y-16 z-50">
        <img className="w-56" src="/assets/logo.png" alt="logo" />
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      </div>
    </div>
  );
};

export default Login;
