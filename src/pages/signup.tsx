import Navbar from "../components/navbar";
import HomeSearchBar from "../components/homepage_searchbar";
import { SignUp } from "@clerk/clerk-react";

const UserSignUp = () => {
  return (
    <>
      <Navbar />
      <div className="hero bg-white min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center space-x-20">
          <HomeSearchBar />
          <SignUp
            signInUrl="/signin" />
        </div>
      </div>
    </>
  );
}

export default UserSignUp;
