import { Link } from "react-router-dom";

const Lost = () => {
    return (
        <div className="mockup-browser bg-base-300 border">
            <div className="mockup-browser-toolbar">
                <div className="input">https://localhost:5173/lost</div>
            </div>
            <div className="bg-base-600 flex justify-center px-4 py-16"><Link to="http://localhost:5173/explore">Find your way home.</Link></div>
        </div>
    );
};

export default Lost