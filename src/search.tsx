import React, { useState, useEffect } from "react";

interface Course {
    dept: string;
    code: string;
    credit: number;
    name: string;
}

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Course[]>([]);
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.trim() === '') {
                console.log('Empty query, clearing results');
                setSearchResults([]);
                setDropdownVisible(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                console.log('Fetching results for query:', searchQuery);
                const apiResponse = await fetch(`http://127.0.0.1:8000/coursedata/courses/`);
                console.log('API Response status:', apiResponse.status);

                if (!apiResponse.ok) {
                    throw new Error(`Error ${apiResponse.status}: ${apiResponse.statusText}`);
                }

                const data = await apiResponse.json();
                console.log('API Response data:', JSON.stringify(data, null, 2));

                if (!Array.isArray(data)) {
                    throw new Error('API did not return an array');
                }

                setSearchResults(data);
                setDropdownVisible(data.length > 0); // Only show if there are results
                console.log('Search results set:', data.length, 'items');
            } catch (error) {
                setError(`Error fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`);
                console.error('Error in fetchSearchResults:', error);
            } finally {
                setIsLoading(false);
            }
        };

        console.log('Effect running, searchQuery:', searchQuery);
        if (searchQuery.trim().length > 0) {
            fetchSearchResults();
        } else {
            setDropdownVisible(false); // Hide dropdown if query is empty
        }
    }, [searchQuery]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log('Input changed:', value);
        setSearchQuery(value);
    };

    console.log('Rendering component. Dropdown visible:', isDropdownVisible, 'Results:', searchResults.length);

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
            {error && <div className="text-red-500">{error}</div>}

            {isDropdownVisible && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-auto">
                    {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                            <li key={index} className="p-2 cursor-pointer hover:bg-gray-200">
                                <span>{result.dept} {result.code} ({result.credit} credits) -&gt; {result.name}</span>
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
