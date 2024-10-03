import React, { useEffect, useState } from 'react';
import FilterCard from './filtercard';

interface Course {
    dept: string;
    code: string;
    name: string;
    ratings?: number;
    difficulty?: number;
}

const Explore: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [maxDifficulty, setMaxDifficulty] = useState<number>(1);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/courses/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Course[] = await response.json();
                console.log("Fetched data:", data); // Log the data
                setCourses(data);
                setFilteredCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        // Filter courses whenever filter values change
        const filtered = courses.filter(course => {
            const ratingCondition = course.ratings === undefined ||
                course.ratings >= minRating;
            const difficultyCondition = course.difficulty === undefined ||
                course.difficulty >= maxDifficulty;

            return ratingCondition && difficultyCondition;
        });

        setFilteredCourses(filtered);
    }, [courses, minRating, maxDifficulty]);

    // Debugging output to check courses and filteredCourses
    console.log("Courses:", courses);
    console.log("Filtered Courses:", filteredCourses);

    return (
        <div className="flex">
            {/* Main content area */}
            <div className="flex-1 p-6">
                <h1>Explore Courses</h1>
                <ul>
                    {filteredCourses.length === 0 ? (
                        <li>No courses found.</li>
                    ) : (
                        filteredCourses.map((course, index) => (
                            <li key={index}>
                                {course.dept} {course.code} - {course.name}
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* Filter Card on the right side */}
            <div className="w-1/4 p-4">
                <FilterCard
                    minRating={minRating}
                    maxDifficulty={maxDifficulty}
                    setMinRating={setMinRating}
                    setMaxDifficulty={setMaxDifficulty}
                />
            </div>
        </div>
    );
};

export default Explore;
