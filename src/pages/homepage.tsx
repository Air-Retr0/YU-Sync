import AuthCard from "../components/authcard";
import HomeSearchBar from "../components/homesearchbar";
import NavBar from "../components/navbar";
import TextAnimation from "../components/textanimation";

function Homebackground() {
    return (
        <>
            <NavBar />
            <div className="hero bg-white min-h-screen flex items-center justify-center relative">
                <div className=" absolute top-20 w-full flex justify-center">
                    <TextAnimation />
                </div>
                <div className="mr-10 ml-10">
                    <HomeSearchBar />
                </div>
                <div className="mr-10 ml-10">
                    <AuthCard />
                </div>
            </div>
        </>
    );
}

export default Homebackground;