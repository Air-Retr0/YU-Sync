import HomeSearchBar from "../components/homepage_searchbar";
import NavBar from "../components/navbar";

function Homebackground() {
    return (
        <>
            <NavBar />
            <div className="hero bg-white min-h-screen flex items-center justify-center">
                <HomeSearchBar />
            </div>
        </>
    );
}

export default Homebackground;
