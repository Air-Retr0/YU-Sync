import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { debounce } from 'lodash';
import callAPI from '../utils/apicall';

interface Course {
  type: 'course';
  dept: string;
  code: string;
  name: string;
}

interface Professor {
  type: 'professor';
  dept: string;
  first: string;
  last: string;
}

type SearchItem = Course | Professor;

const SearchBar: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);

      const coursesResponse = await callAPI.from('courses').select('dept, code, name');
      if (coursesResponse.error) throw coursesResponse.error;

      const courses: Course[] = coursesResponse.data.map((course) => ({
        ...course,
        type: 'course',
      }));

      const profsResponse = await callAPI.from('profs').select('dept, first, last');
      if (profsResponse.error) throw profsResponse.error;

      const professors: Professor[] = profsResponse.data.map((prof) => ({
        ...prof,
        type: 'professor',
      }));


      setSearchData([...courses, ...professors]);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const debouncedSearch = debounce((searchTerm: string) => {
    if (searchTerm.length >= 3) {
      const fuse = new Fuse(searchData, {
        keys: ['dept', 'code', 'name', 'first', 'last'],
        threshold: 0.3,
      });

      const results = fuse.search(searchTerm).slice(0, 3).map((result) => result.item);
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    debouncedSearch(value);
  };

  const handleSelectItem = (item: SearchItem) => {
    if (item.type === 'course') {
      navigate(`/explore/courses/${item.dept.toLowerCase()}/${item.code}`);
    } else if (item.type === 'professor') {
      navigate(`/explore/professors/${item.first.toLowerCase()}-${item.last.toLowerCase()}`);
    }
  };

  const handleExploreAllCourses = (dept: string) => {
    navigate(`/explore/courses/${dept.toLowerCase()}`);
  };

  const handleExploreAllProfs = (dept: string) => {
    navigate(`/explore/professors/${dept.toLowerCase()}`);
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
          className="flex-grow px-2 py-1 text-lg bg-transparent text-white placeholder-white focus:border-transparent outline-none"
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
      {(filteredResults.length > 0 || input.length >= 3) && (
        <ul className="absolute top-full left-0 w-full border bg-white shadow-lg rounded-lg mt-1 p-2 max-h-96 overflow-auto">
          {filteredResults.map((item, index) => (
            <li key={index} className="p-2 border-b hover:bg-gray-100">
              <button
                className="w-full text-left text-black"
                onClick={() => handleSelectItem(item)}
              >
                {item.type === 'course' ? (
                  <span>
                    <span className="font-bold text-red-500">{item.dept.toUpperCase()} {item.code}</span> — {item.name}
                  </span>
                ) : (
                  <span>
                    <span className="font-bold text-blue-500">{item.first} {item.last}</span> ({item.dept})
                  </span>
                )}
              </button>
            </li>
          ))}
          {input.length >= 3 && (
            <>
              <li className="p-2 hover:bg-gray-100">
                <button
                  className="w-full text-left text-red-500 font-medium"
                  onClick={() => handleExploreAllCourses(input)}
                >
                  Explore all courses in {input.toUpperCase()}
                </button>
              </li>
              <li className="p-2 hover:bg-gray-100">
                <button
                  className="w-full text-left text-blue-500 font-medium"
                  onClick={() => handleExploreAllProfs(input)}
                >
                  See all professors in {input.toUpperCase()}
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
