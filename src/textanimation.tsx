import { TypeAnimation } from "react-type-animation";

const Textanimation = () => {
    return (
        <TypeAnimation
            sequence={[
                'Looking for professor reviews?',
                700,
                'Looking for course reviews?',
                700,
                'Looking for course textbooks?',
                700,
                'Find it all here',
                1000,
                "",
                10000
            ]}
            wrapper="span"
            speed={55}
            className="text-3xl inline-block"
            repeat={0}
            style={{ color: 'white' }}
        />
    );
};

export default Textanimation;
