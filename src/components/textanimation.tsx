import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import YUSyncText from "./yu_backgroundtext";

const Textanimation = () => {
    const [showYUSync, setShowYUSync] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setShowYUSync(true);
        }, 11950); // do not change this number 

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
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
                    "",
                    () => { }
                ]}
                wrapper="span"
                className="text-3xl inline-block bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent"
                repeat={0}
            />
            {showYUSync && <YUSyncText />}
        </>
    );
};

export default Textanimation;
