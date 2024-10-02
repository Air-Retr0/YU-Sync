import Textanimation from "./textanimation";
import SearchBar from "./search";
import Navbar from "./navbar";

function Homebackground() {
    return (
        <><Navbar />
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://cdnarchitect.s3.ca-central-1.amazonaws.com/wp-content/uploads/2014/10/1003312186-1003312189.jpg)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <Textanimation />
                        <p className="mb-5"></p>
                        <SearchBar />
                    </div>
                </div>
            </div></>
    );
}

export default Homebackground