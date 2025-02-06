import { Link } from "react-router-dom";
import {
  FaBook, FaChalkboardTeacher, FaUniversity, FaGraduationCap,
  FaSearch, FaInfoCircle, FaQuestionCircle, FaShieldAlt,
  FaEnvelope, FaCog, FaSignOutAlt
} from "react-icons/fa";

const DropdownMenu = () => {
  return (
    <ul className="menu menu-sm dropdown-content absolute bg-white text-black rounded-box shadow-lg z-[1] mt-3 w-60 p-4">
      <li className="text-lg font-semibold text-gray-800 mb-3">Services</li>
      <li>
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/explore/courses">
          <FaBook /> Explore All Courses
        </Link>
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/explore/professors">
          <FaChalkboardTeacher /> Explore All Professors
        </Link>
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/explore/faculty">
          <FaUniversity /> Explore All Faculties
        </Link>
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/explore">
          <FaBook /> Explore Popular Courses
        </Link>
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/explore/programs">
          <FaGraduationCap /> Explore Undergrad Programs
        </Link>
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/explore/programs/grad">
          <FaGraduationCap /> Explore Grad Programs
        </Link>
      </li>
      <li>
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/find">
          <FaSearch /> Elective Finder (TBD)
        </Link>
      </li>
      <li className="text-lg font-semibold text-gray-800 mt-2 mb-3">Information</li>
      <li>
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/privacy">
          <FaShieldAlt /> Privacy Policy
        </Link>
      </li>
      <li>
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/about">
          <FaInfoCircle /> About
        </Link>
      </li>
      <li>
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/faq">
          <FaQuestionCircle /> FAQ
        </Link>
        <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="mailto:help@YU-Sync.com">
          <FaEnvelope /> Contact Us
        </a>
      </li>
      <li className="border-t border-gray-300 mt-3 pt-2">
        <Link className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" to="/settings">
          <FaCog /> Settings
        </Link>
      </li>
      <li>
        <button className="flex w-full items-center gap-2 text-left hover:text-red-600 transition-colors" onClick={() => console.log("Logout triggered")}>
          <FaSignOutAlt /> Logout
        </button>
      </li>
    </ul>
  );
};

export default DropdownMenu;
