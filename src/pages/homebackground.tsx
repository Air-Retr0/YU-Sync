import Navbar from "../components/navbar";
import SignInCard from "../components/signincard";
import SearchBar from "../components/searchbar";

function Homebackground() {
    return (
        <>
            <Navbar />
            <div className="hero bg-white min-h-screen flex items-center justify-center">
                <SearchBar />
                <SignInCard />
            </div>
        </>
    );
}

export default Homebackground;
