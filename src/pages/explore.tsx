import React, { useEffect, useState } from 'react';
import FilterCard from '../components/filtercard';
import ExploreNavBar from '../components/explore_navbar';
import CourseList from '../components/courselist';

interface Course {
    dept: string;
    code: string;
    name: string;
    ratings?: number;
    difficulty?: number;
    avgGrade?: number;
    enjoyed?: number;
}

const Explore: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [maxDifficulty, setMaxDifficulty] = useState<number>(1);
    const [sortCriteria, setSortCriteria] = useState<string>(''); // For storing current sort criteria
    const [sortOrder, setSortOrder] = useState<boolean>(true); // True for ascending, false for descending

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/courses/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Course[] = await response.json();
                setCourses(data);
                setFilteredCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const filtered = courses.filter(course => {
            const ratingCondition = course.ratings === undefined || course.ratings >= minRating;
            const difficultyCondition = course.difficulty === undefined || course.difficulty >= maxDifficulty;

            return ratingCondition && difficultyCondition;
        });

        // Sort courses based on selected criteria and order
        const sorted = filtered.sort((a, b) => {
            let aValue = 0;
            let bValue = 0;

            if (sortCriteria === 'ratings') {
                aValue = a.ratings || 0;
                bValue = b.ratings || 0;
            } else if (sortCriteria === 'difficulty') {
                aValue = a.difficulty || 0;
                bValue = b.difficulty || 0;
            } else if (sortCriteria === 'avgGrade') {
                aValue = a.avgGrade || 0;
                bValue = b.avgGrade || 0;
            } else if (sortCriteria === 'enjoyed') {
                aValue = a.enjoyed || 0;
                bValue = b.enjoyed || 0;
            } else if (sortCriteria === 'year') {
                aValue = parseInt(a.code.charAt(0), 10);
                bValue = parseInt(b.code.charAt(0), 10);
            }

            return sortOrder ? aValue - bValue : bValue - aValue; // Ascending or descending
        });

        setFilteredCourses(sorted);
    }, [courses, minRating, maxDifficulty, sortCriteria, sortOrder]);

    // Function to handle filter clicks
    const handleSort = (criteria: string) => {
        if (sortCriteria === criteria) {
            setSortOrder(!sortOrder); // Toggle order 
        } else {
            setSortCriteria(criteria);
            setSortOrder(true);
        }
    };

    return (
        <div className="flex flex-col bg-neutral-100 min-h-screen">
            <ExploreNavBar />
            <div className="flex-1 p-6 container mx-auto grid grid-cols-4 gap-4">
                {/* Courses Table */}
                <div className="col-span-3">
                    <h1 className="text-2xl font-bold mb-4">Explore Courses</h1>

                    {/* Filters */}
                    <div className="flex space-x-4 mb-4">
                        <button onClick={() => handleSort('ratings')} className="btn">
                            Ratings {sortCriteria === 'ratings' ? (sortOrder ? '↑' : '↓') : ''}
                        </button>
                        <button onClick={() => handleSort('difficulty')} className="btn">
                            Difficulty {sortCriteria === 'difficulty' ? (sortOrder ? '↑' : '↓') : ''}
                        </button>
                        <button onClick={() => handleSort('avgGrade')} className="btn">
                            Avg Grade {sortCriteria === 'avgGrade' ? (sortOrder ? '↑' : '↓') : ''}
                        </button>
                        <button onClick={() => handleSort('enjoyed')} className="btn">
                            Enjoyed {sortCriteria === 'enjoyed' ? (sortOrder ? '↑' : '↓') : ''}
                        </button>
                    </div>

                    <CourseList courses={filteredCourses} />
                </div>

                {/* Filter Card on the right */}
                <div className="col-span-1">
                    <FilterCard
                        minRating={minRating}
                        maxDifficulty={maxDifficulty}
                        setMinRating={setMinRating}
                        setMaxDifficulty={setMaxDifficulty}
                    />
                </div>
            </div>
        </div>
    );
};

export default Explore;
