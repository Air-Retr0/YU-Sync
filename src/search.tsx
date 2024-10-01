import React, { useState, useEffect } from "react";

interface Course {
    dept: string;
    code: string;
    credit: number;
    name: string;
    prereqs: string; // New field for prerequisites
    desc: string;    // New field for description
}

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Course[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Fetch courses based on searchQuery
    useEffect(() => {
        const fetchCourses = async (query: string) => {
            setIsLoading(true);

            try {
                const apiResponse = await fetch(`http://127.0.0.1:8000/coursedata/courses/?search=${query}`);

                if (!apiResponse.ok) {
                    return; // Simply return if the response is not OK
                }

                const data = await apiResponse.json();
                console.log('Fetched course data:', data); // Log the entire response for inspection

                if (Array.isArray(data)) {
                    const validResults = data.map(course => ({
                        dept: course.dept || 'N/A',
                        code: course.code || 'N/A',
                        credit: course.credit || 0,
                        name: course.name || 'Unnamed Course',
                        prereqs: course.prereqs || 'None', // Include prereqs with a fallback
                        desc: course.desc || 'No description available', // Include description with a fallback
                    }));

                    setSearchResults(validResults); // Store valid results directly from API response
                    setDropdownVisible(validResults.length > 0); // Show dropdown if there are results
                }
            } catch {
                // Handle error silently (as per your request)
            } finally {
                setIsLoading(false);
            }
        };

        if (searchQuery.trim()) {
            fetchCourses(searchQuery); // Fetch courses when there is a query
        } else {
            setSearchResults([]); // Clear results if the query is empty
            setDropdownVisible(false); // Hide dropdown if no query
        }
    }, [searchQuery]); // Effect will re-run when searchQuery changes

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value); // Update the search query
    };

    // Highlight matches in the search results
    const highlightMatch = (text: string | undefined) => {
        if (!text || !searchQuery) return text || '';
        const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === searchQuery.toLowerCase() ? (
                <strong key={index} className="text-blue-500">{part}</strong>
            ) : part
        );
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search for any department, course code or name"
                value={searchQuery}
                onChange={handleInputChange}
                className="input input-bordered input-primary max-w-md w-full"
            />

            {isLoading && <div className="text-gray-500">Loading...</div>}

            {/* Dropdown Menu */}
            {isDropdownVisible && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-auto shadow-lg">
                    {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                            <li key={index} className="p-2 cursor-pointer hover:bg-gray-200">
                                <span>
                                    {highlightMatch(result.dept)} {highlightMatch(result.code)} ({result.credit} credits) -&gt; {highlightMatch(result.name)}
                                </span>
                                <div className="text-sm text-gray-600">
                                    <p>Prerequisites: {highlightMatch(result.prereqs)}</p>
                                    <p>Description: {highlightMatch(result.desc)}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-2">No results found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
