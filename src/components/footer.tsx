import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer bg-neutral text-neutral-content p-10">
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover"><Link to='/'>Course Search</Link></a>
                <a className="link link-hover"><Link to='/explore'>Course & Prof reviews</Link></a>
                <a className="link link-hover">Course PDF's</a>
                <a className="link link-hover">Course Matcher</a>
            </nav>
            <nav>
                <h6 className="footer-title">YU Sync Team</h6>
                <a className="link link-hover"><Link to='/about'>About us</Link></a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Error report</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover"><Link to='/privacy'>Privacy policy</Link></a>
                <a className="link link-hover"><Link to='/cookies'>Cookie policy</Link></a>
            </nav>
        </footer>
    );
};

export default Footer