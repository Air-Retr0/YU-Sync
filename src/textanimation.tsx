import { TypeAnimation } from "react-type-animation";


const textanimation = () => {
    return (
        <TypeAnimation
            sequence={[
                'Looking for professor and course reviews/textbooks?',
                700
            ]}
            wrapper="span"
            speed={55}
            style={{ fontSize: '3em', display: 'inline-block' }}
            repeat={Infinity}
        />
    )
}

export default textanimation