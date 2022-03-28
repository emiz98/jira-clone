import { ArrowDropDown } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ userLogged }) => {
  const history = useHistory();
  const [toggleLogout, setToggleLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    history.push("/login");
  };

  return (
    <div className="flex sticky top-0 bg-white items-center justify-between px-4 md:px-10 py-5 border-b border-gray-200">
      <Link to="/">
        <img src="/assets/logo.png" alt="logo" className="w-32" />
      </Link>
      <div className="flex items-center font-medium text-gray-600 text-lg">
        <div className="space-x-10 hidden md:flex">
          <Link to="/">
            <span className="text-black cursor-pointer">Issues</span>
          </Link>
          <span className="hover:text-black cursor-pointer">Your Works</span>
          <span className="hover:text-black cursor-pointer">People</span>
        </div>
        <div className="items-center flex space-x-3 ml-20">
          <Avatar src={userLogged?.imageUrl} />
          <div className="items-center relative group">
            <div
              onClick={() => setToggleLogout(!toggleLogout)}
              className="text-sm flex items-center md:space-x-1 text-black hover:bg-gray-200 cursor-pointer bg-gray-300 md:px-3 md:py-2 rounded-full"
            >
              <span className="hidden md:inline-flex">{userLogged?.name}</span>
              <ArrowDropDown className="group-hover:scale-125 cursor-pointer" />
            </div>

            {/* <div
              onClick={handleLogout}
              className="bg-blue-500 ml-5 px-3 py-2 rounded-md text-white font-bold text-lg cursor-pointer hover:bg-blue-600 transition ease-in-out"
            >
              Logout
            </div> */}
            {toggleLogout && (
              <span
                onClick={handleLogout}
                className="absolute top-12 right-0 bg-gray-400 text-white px-3 rounded-md py-1 cursor-pointer hover:bg-gray-500"
              >
                Logout
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
