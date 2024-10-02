import React, { useState, useEffect } from "react";

interface Course {
    dept: string;
    code: string;
    credit: number;
    name: string;
    prereqs: string;
    desc: string;
}

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Course[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCourses = async () => {
            if (searchQuery.trim().length < 4) {
                setSearchResults([]); // Clear results if query is too short
                setDropdownVisible(false);
                return;
            }

            setIsLoading(true);

            try {
                // Update the API URL to match the Django API endpoint
                const apiResponse = await fetch(`http://127.0.0.1:8000/api/courses/?search=${searchQuery}`);

                if (!apiResponse.ok) {
                    console.error(`API Response Status: ${apiResponse.status}`);
                    return; // Exit early if response is not OK
                }

                const data = await apiResponse.json(); // Fetch the JSON data directly
                console.log("Fetched data:", data); // For debugging purposes

                // Check if the response has a 'courses' key
                if (data.courses && Array.isArray(data.courses) && data.courses.length > 0) {
                    setSearchResults(data.courses); // Set search results from API
                    setDropdownVisible(true); // Show dropdown if there are results
                } else {
                    setSearchResults([]); // Clear results if no valid data
                    setDropdownVisible(false); // Hide dropdown if no valid data
                }
            } catch (error) {
                console.error('Error fetching data:', error); // Log errors for debugging
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses(); // Fetch courses whenever searchQuery changes
    }, [searchQuery]); // Effect will re-run when searchQuery changes

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value); // Update the search query
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search for any department, course code, or name"
                value={searchQuery}
                onChange={handleInputChange}
                className="input input-bordered input-primary max-w-md w-full"
            />

            {isLoading && <div className="text-gray-500">Loading...</div>}

            {/* Dropdown Menu */}
            {isDropdownVisible && searchResults.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-auto shadow-lg">
                    {searchResults.map((result, index) => (
                        <li key={index} className="p-2 cursor-pointer hover:bg-gray-200">
                            <span>
                                <strong>{result.dept} {result.code} - </strong>
                                {result.name}<br />
                                <strong>Credits:</strong> {result.credit || 0}<br />
                                <strong>Prerequisites:</strong> {result.prereqs || 'None'}<br />
                                <strong>Description:</strong> {result.desc || 'No description available'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
