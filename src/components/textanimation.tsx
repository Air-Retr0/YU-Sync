import { TypeAnimation } from "react-type-animation"

const Textanimation = () => {


    return (
        <TypeAnimation
            sequence={[
                'Looking for professor reviews?',
                400,
                'Looking for course reviews?',
                400,
                'Looking for course textbooks?',
                400,
                'Find it all here',
                1000,
                'YU Sync',
            ]}
            wrapper="span"
            className="text-3xl inline-block bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent"
            repeat={0}
        />
    );
};

export default Textanimation;
