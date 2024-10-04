import Textanimation from "../components/textanimation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Homebackground() {
    return (
        <div className="flex flex-col min-h-screen bg-transparent"> {/* */}
            <Navbar />
            <main className="flex-grow">
                <div
                    className="hero h-[calc(73vh-0px)]"
                    style={{
                        backgroundImage:
                            "url(https://cdnarchitect.s3.ca-central-1.amazonaws.com/wp-content/uploads/2014/10/1003312186-1003312189.jpg)",
                    }}
                >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-md">
                            <Textanimation />
                            <p className="mb-5"></p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Homebackground;
