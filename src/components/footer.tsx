import { FiGithub } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer bg-red-500 text-neutral-content items-center p-4">
            <aside className="grid-flow-col items-center text-white">
                YU Sync {new Date().getFullYear()}
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">

                <a href="https://github.com/Air-Retr0" target="_blank">
                    <FiGithub size={24} />
                </a>
                <a href="https://www.linkedin.com/in/jahiem-allen/" target="_blank">
                    <FaLinkedin size={24} />
                </a>
            </nav>
        </footer >
    )
};

export default Footer