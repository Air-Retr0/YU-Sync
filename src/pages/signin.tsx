import Navbar from "../components/navbar";
import HomeSearchBar from "../components/homepage_searchbar";
import { SignIn } from "@clerk/clerk-react";

function UserSignIn() {
    return (
        <>
            <Navbar />
            <div className="hero bg-white min-h-screen flex items-center justify-center">
                <div className="flex items-center justify-center space-x-20">
                    <HomeSearchBar />
                    <SignIn
                        signUpUrl="/" />
                </div>
            </div>
        </>
    );
}

export default UserSignIn;
