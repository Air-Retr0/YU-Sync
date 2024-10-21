import Navbar from "../components/navbar";
import HomeSearchBar from "../components/homepage_searchbar";
import { SignIn, useUser } from "@clerk/clerk-react";

function UserSignIn() {
    const { isSignedIn } = useUser();

    return (
        <>
            <Navbar />
            <div className="hero bg-white min-h-screen flex items-center justify-center">
                <div className="flex items-center justify-center space-x-20">
                    <HomeSearchBar />
                    {!isSignedIn ? (
                        <SignIn signUpUrl="/" />
                    ) : (
                        <div className="flex items-center justify-center">
                            <h1 className="text-2xl font-bold">
                                You are already signed in
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserSignIn;
