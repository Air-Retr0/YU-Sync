import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

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
        const response = await fetch('http://127.0.0.1:8000/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses data');
        }
        const data: Course[] = await response.json();
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
      setFilteredCourses(filtered.slice(0, 5));
    } else {
      setFilteredCourses([]);
    }
  }, [input, coursesData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSelectCourse = (course: Course) => {
    navigate(`/courses/${course.dept}/${course.code}`);
  };

  if (loading) {
    return <div><span className="loading loading-dots loading-sm"></span></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={input}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      {filteredCourses.length > 0 && (
        <ul className="absolute top-full left-0 z-10 w-full bg-base-100 shadow-lg rounded-lg mt-1 max-h-60 overflow-auto">
          {filteredCourses.map((course) => (
            <li key={course.code} className="p-2 border-b hover:bg-gray-100">
              <button
                className="w-full text-left"
                onClick={() => handleSelectCourse(course)}
              >
                {course.dept} | {course.code}
                <br />
                {course.name}
              </button>
            </li>
          ))}
          {input.length >= 4 && (
            <li className="p-2 hover:bg-gray-100">
              <button
                className="w-full text-left"
                onClick={() => navigate(`/explore/${input}`)}
              >
                Explore all courses with "{input}"
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
