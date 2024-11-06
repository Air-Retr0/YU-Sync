import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import callAPI from '../utils/apicall';

// imagine the google search bar, it must be impossible giving how simple the end result of this is.

interface Course {
  dept: string;
  code: string;
  name: string;
}

const SearchBar: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await callAPI.from('courses').select('dept, code, name');
        if (response.error) {
          throw response.error;
        }
        const data: Course[] = response.data;
        setCoursesData(data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (input.length >= 4) {
      const filtered = coursesData.filter(
        (course) =>
          course.dept.toLowerCase().includes(input.toLowerCase()) ||
          course.code.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCourses(filtered.slice(0, 4));
    } else {
      setFilteredCourses([]);
    }
  }, [input, coursesData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSelectCourse = (course: Course) => {
    navigate(`/explore/${course.dept.toLowerCase()}/${course.code}`);
  };

  if (loading) {
    return <div><span><span className="loading loading-dots loading-sm"></span></span></div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 border-b-2 border-white p-2 bg-transparent">
        <input
          type="text"
          className="flex-grow px-2 py-1 text-lg bg-transparent text-white placeholder-white focus:border-transparent"
          placeholder="Search"
          value={input}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-6 w-6 text-white"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {filteredCourses.length > 0 && (
        <ul className="absolute top-full left-0 w-full border bg-white shadow-lg rounded-lg mt-1 p-2 max-h-96 overflow-visible">
          {filteredCourses.map((course) => (
            <li key={course.code} className="p-2 border-b hover:bg-gray-100">
              <button
                className="w-full text-left text-black"
                onClick={() => handleSelectCourse(course)}
              >
                <span className="font-bold text-red-500">{course.dept.toUpperCase()} {course.code}</span> — {course.name}
              </button>
            </li>
          ))}
          <li className="p-2 hover:bg-gray-100">
            <button
              className="w-full text-left text-red-500 font-medium"
              onClick={() => navigate(`/explore/${input.toLowerCase()}`)}
            >
              Explore all courses with "{input}"
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
