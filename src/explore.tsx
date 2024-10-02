import React, { useEffect, useState } from 'react';

interface Course {
    dept: string;
    code: string;
    name: string;
    ratings?: number;    // Assuming ratings are part of your course object
    enjoyed?: number;    // Changed to number
    difficulty?: number;  // Changed to number
}

const Explore: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/coursedata/'); // Adjust this to your API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Course[] = await response.json();
                setCourses(data);
                setFilteredCourses(data); // Initialize with all courses
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    // Function to handle filter changes
    const handleFilterChange = (filterType: string) => {
        let filtered: Course[];

        switch (filterType) {
            case 'ratings':
                filtered = courses.filter(course => course.ratings && course.ratings >= 4); // Example filter condition
                break;
            case 'enjoyed':
                filtered = courses.filter(course => course.enjoyed && course.enjoyed >= 4); // Example filter condition
                break;
            case 'difficulty':
                filtered = courses.filter(course => course.difficulty === 1); // Example filter condition (1 for easy)
                break;
            default:
                filtered = courses; // Reset to all courses if no filter is selected
        }

        setFilteredCourses(filtered);
    };

    return (
        <div>
            <h1>Explore Courses</h1>
            <div>
                <h2>Filters</h2>
                <button onClick={() => handleFilterChange('ratings')}>High Ratings</button>
                <button onClick={() => handleFilterChange('enjoyed')}>Most Enjoyed</button>
                <button onClick={() => handleFilterChange('difficulty')}>Easy Courses</button>
                <button onClick={() => setFilteredCourses(courses)}>Reset Filters</button>
            </div>
            <ul>
                {filteredCourses.map((course, index) => (
                    <li key={index}>
                        {course.dept} {course.code} - {course.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Explore;
