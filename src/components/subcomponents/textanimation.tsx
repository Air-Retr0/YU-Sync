import { TypeAnimation } from "react-type-animation"

const TextAnimation = () => {

    return ( // I cannot for the life of me write the correct classname, send help
        <TypeAnimation
            sequence={[
                'Looking for course reviews?',
                400,
                'Looking for professor reviews?',
                400,
                'Find it all here',
            ]}
            wrapper="span"
            className="text-2xl inline-block bg-gradient-to-r text-red-500 bg-clip"
            repeat={0}
        />
    );
};

export default TextAnimation;
