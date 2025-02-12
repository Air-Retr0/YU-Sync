import TextAnimation from "../components/subcomponents/textanimation";
import NavBar from "../components/navbar";
import HomeSearchBar from "../components/subcomponents/homesearchbar";


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
            </div>
        </>
    );
}

export default Homebackground;