import { Link } from "react-router-dom";
import BreadCrumbs from "../components/breadcrumbs";
import NavBar from "../components/navbar";

// i'll make this look pretty i promise
const Lost = () => {
    return (
        <>
            <NavBar />
            <BreadCrumbs />
            <div className="hero bg-white min-h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">404</h1>
                    <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
                    <p className="text-red-500">Hint: Click on them :)</p>

                    <div className="chat chat-start mt-12">
                        <div className="chat-bubble chat-bubble-primary">
                            <Link to='/'>
                                Head on Home
                            </Link>
                        </div>
                    </div>
                    <div className="chat chat-start mt-4">
                        <div className="chat-bubble chat-bubble-secondary">
                            <Link to='/explore/courses'>
                                Curious about what else is out there?
                            </Link>
                        </div>
                    </div>
                    <div className="chat chat-start mt-6">
                        <div className="chat-bubble chat-bubble-accent">
                            <Link to='/explore/professors'>
                                Find a Professor
                            </Link>
                        </div>
                    </div>

                    <div className="chat chat-end mt-8">
                        <div className="chat-bubble chat-bubble-info">
                            <Link to='/find'>
                                Or perhaps, find specific courses?
                            </Link>
                        </div>
                    </div>
                    <div className="chat chat-end mt-5">
                        <div className="chat-bubble chat-bubble-success">
                            <Link to='/privacy'>
                                Privacy Policy, no spyware here!
                            </Link>
                        </div>
                    </div>
                    <div className="chat chat-end mt-5">
                        <div className="chat-bubble chat-bubble-warning">
                            <Link to='/about'>
                                How about a history lesson?
                            </Link>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-error mt-6">
                            <Link to='/faq'>
                                Questions about the site?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Lost