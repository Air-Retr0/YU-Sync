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
                            Whether you're a first-year student or a seasoned senior, YU Sync is your go-to resource for all courses @ York.
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
                            <br /> <br />
                            The origins of that idea can be traced back to the Markham Campus, and the SSADC @ York, where the very first iteration of YU Sync was started; as a simple textbook finder & exchange platform.
                            While plans for the platform have changed, our mission remains the same: to help students make informed decisions about their academic journey.
                        </p>
                    </div>
                    <div className="text-2xl mt-16 text-red-500 font-semibold">
                        Meet the team
                    </div>
                    <div className="mt-6 text-lg text-gray-700">
                        Placeholder
                    </div>
                </div>
            </div>
        </>
    );
};

export default About