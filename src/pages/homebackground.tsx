import Navbar from "../components/navbar";
import SignInCard from "../components/signincard";
import HomeSearchBar from "../components/home_searchbar";

function Homebackground() {
    return (
        <>
            <Navbar />
            <div className="hero bg-white min-h-screen flex items-center justify-center space-x-10">
                <HomeSearchBar />
                <div className="flex items-start justify-start">
                    <SignInCard />
                </div>
            </div >
        </>
    );
}

export default Homebackground;
