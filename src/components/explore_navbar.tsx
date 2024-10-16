import { Link } from 'react-router-dom';


const ExploreNavBar = () => {
    return (
        <nav className="bg-red-600 p-4 flex items-center text-white">
            {/* Dropdown */}
            <div className="flex items-center space-x-4">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 sunset text-white">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/explore">Explore All Courses</Link></li>
                        <li><Link to="/matcher">Course Matcher</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>

                {/* Hotkey for Name in Navbar -> Home */}
                <div className="text-2xl font-bold">
                    <Link to="/" className="text-white">YU Sync</Link>
                </div>
            </div>

            <div className="flex grow justify-center">
                <input
                    type="text"
                    placeholder="functionality in progress"
                    className="input input-bordered w-full max-w-xs"
                    disabled />
            </div>

            {/* Notification Section */}
            <div className="ml-auto flex items-center">
                <ul className="menu bg-red-600 lg:menu-horizontal rounded-box">
                    <li>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Inbox
                            <span className="badge badge-sm bg-inherit">99+</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Updates
                            <span className="badge badge-sm badge-warning">Test</span>
                        </a>
                    </li>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">In Progress</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default ExploreNavBar;
