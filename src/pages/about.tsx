import BreadCrumbs from "../components/breadcrumbs";
import NavBar from "../components/navbar";

const About = () => {
    return (
        <>
            <NavBar />
            <BreadCrumbs />
            <div className="hero bg-white min-h-screen relative">
                <div className="hero-content flex flex-col items-center text-center">
                    <div className="text-4xl font-bold absolute top-4 left-60 text-red-500 ">
                        About
                    </div>

                    <div className="text-2xl mt-20 text-red-500 font-semibold">
                        Warm Welcomes!
                    </div>
                    <div className="mt-6 text-lg text-gray-700">
                        <p>
                            What is YU Sync?
                            It's exactly as it sounds, YU (as in You) sync your experiences with every prof and course you've taken at York University.
                            Our platform is here to help you explore courses, share insights, and make better academic decisions.
                            Whether you're a first-year student or a senior who needs to escape the gates, YU Sync is your go-to resource for all courses @ York.
                            <br /> <br />
                            Had a great experience with a professor? Share it with the community! Had a tough time with a course? Let others know!
                            We encourage you to be honest, respectful, and helpful in your reviews. Together, we can build a better academic community.
                        </p>
                    </div>

                    <div className="text-2xl mt-16 text-red-500 font-semibold">
                        The Story Behind YU Sync
                    </div>
                    <div className="mt-6 text-lg text-gray-700">
                        <p>
                            YU Sync was born from a simple idea, to make academic planning easier and more collaborative.
                            We noticed how challenging it was to find reliable information about courses and professors, so we built a platform where students can share reviews, learn from each other's experiences, and navigate their education with confidence.
                        </p>
                    </div>
                    <div className="text-2xl mt-16 text-red-500 font-semibold">
                        Meet the team
                    </div>
                    {/* <div className="mt-6 text-lg text-gray-700">
                        I'll give a brief introduction of myself, my name is Jahiem, and I'm a first year Comp Sci student @ Markham. Currently, YU Sync is being solo developed project,
                        as such, please do understand if any inquires sent take some time to receive a reply, or if patches and feature updates aren't commonplace.
                        Thank you for the support!
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default About