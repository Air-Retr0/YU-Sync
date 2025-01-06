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
                    <h1 className="text-4xl font-bold text-black">404</h1>
                    <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
                    <div className="chat chat-start mt-12">
                        <div className="chat-bubble bg-orange-500">
                            <Link to='/'>
                                Head on Home
                            </Link>
                        </div>
                    </div>
                    <div className="chat chat-start mt-4">
                        <div className="chat-bubble bg-emerald-500">
                            <Link to='/explore/courses'>
                                Find all courses
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
                                Find a elective
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
                        <div className="chat-bubble bg-indigo-600">
                            <Link to='/about'>
                                How about a history lesson?
                            </Link>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble bg-red-400 mt-6 text-white">
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