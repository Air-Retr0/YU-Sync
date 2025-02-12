import { useState } from "react";
import {
  FaBook, FaChalkboardTeacher, FaUniversity, FaGraduationCap,
  FaSearch, FaInfoCircle, FaQuestionCircle, FaShieldAlt,
  FaEnvelope, FaCog
} from "react-icons/fa";
import LogoutButton from "./subcomponents/signout";
import Settings from "./subcomponents/settings";

const DropdownMenu = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <ul className="menu menu-sm dropdown-content absolute bg-white text-black rounded-box shadow-lg z-[1] mt-3 w-60 p-4">
        <li className="text-lg font-semibold text-gray-800 mb-3">Services</li>
        <li>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="/explore/courses">
            <FaBook /> Explore All Courses
          </a>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="/explore/professors">
            <FaChalkboardTeacher /> Explore All Professors
          </a>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="/explore/faculty">
            <FaUniversity /> Explore All Faculties
          </a>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="/explore">
            <FaBook /> Explore Popular Courses
          </a>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="/explore/programs">
            <FaGraduationCap /> Explore Undergrad Programs
          </a>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="/explore/programs/grad">
            <FaGraduationCap /> Explore Grad Programs
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="/find">
            <FaSearch /> Elective Finder (TBD)
          </a>
        </li>
        <li className="text-lg font-semibold text-gray-800 mt-2 mb-3">Information</li>
        <li>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="/privacy">
            <FaShieldAlt /> Privacy Policy
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="/about">
            <FaInfoCircle /> About
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="/faq">
            <FaQuestionCircle /> FAQ
          </a>
          <a className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2" href="mailto:help@YU-Sync.com">
            <FaEnvelope /> Contact Us
          </a>
        </li>
        <li className="border-t border-gray-300 mt-3 pt-2">
          <button
            className="flex items-center gap-2 hover:text-gray-700 transition-colors mb-2 w-full text-left"
            onClick={() => setIsSettingsOpen(true)}
          >
            <FaCog /> Settings
          </button>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>

      {isSettingsOpen && <Settings onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
};

export default DropdownMenu;
