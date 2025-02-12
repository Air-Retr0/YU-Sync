import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./searchbar";
import DropdownMenu from "./dropdown";
import LoginButton from "./subcomponents/signin";
import Settings from "./subcomponents/settings";

const NavBar = () => {
  const { user, isAuthenticated } = useAuth0();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <nav className="bg-red-600 p-4 flex items-center text-white sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <DropdownMenu />
          </div>

          <div className="text-2xl font-bold">
            <Link to="/" className="text-white">YU Sync</Link>
          </div>
        </div>

        <div className="flex items-center justify-center flex-grow">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center">
          {isAuthenticated ? (
            <div>
              <img
                src={user?.picture}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={() => setIsSettingsOpen(true)}
              />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>

      {isSettingsOpen && <Settings onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
};

export default NavBar;
