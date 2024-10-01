import React, { useState, useEffect } from "react";

// Defining the Course type for better type safety
interface Course {
    id: number;
    dept: string;
    code: string;
    credit: number;
    name: string;
}

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>(''); // Explicitly setting type to string
    const [courses, setCourses] = useState<Course[]>([]); // Array of Course objects
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]); // Array for filtered results
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false); // Dropdown visibility state

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Adjust the API endpoint to include the search query
                const apiResponse = await fetch(`http://127.0.0.1:8000/coursedata/courses?search=${searchQuery}`);
                const data = await apiResponse.json();
                if (!apiResponse.ok) {
                    console.error(`API error: ${apiResponse.status}`);
                }
                console.log(data); // Debugging to verify data structure
                setCourses(data);
            } catch (error) {
                console.error('Error fetching course data', error);
            }
        };

        // Fetch courses only if the searchQuery is not empty
        if (searchQuery.trim() !== '') {
            fetchCourses();
        } else {
            setCourses([]); // Clear courses when search query is empty
        }
    }, [searchQuery]);

    useEffect(() => {
        setFilteredCourses(courses);
        setDropdownVisible(searchQuery !== '' && courses.length > 0);
    }, [courses, searchQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCourseSelect = (course: Course) => {

        setSearchQuery(course.name);
        setDropdownVisible(false); // Hide dropdown
    };

    return (
        <div className="relative"> {/* dropdown position */}
            <input
                type="text"
                placeholder="Search for any department, course, or profs"
                value={searchQuery}
                onChange={handleInputChange}
                className="input input-bordered input-primary max-w-md w-full"
            />

            {isDropdownVisible && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-auto"> {/* Dropdown styles */}
                    {filteredCourses.map((course) => (
                        <li key={course.id} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleCourseSelect(course)}>
                            {course.name} - {course.dept} ({course.code}) {/* Display course details */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
