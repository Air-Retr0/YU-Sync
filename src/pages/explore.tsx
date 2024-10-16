import React, { useEffect, useState } from 'react';
import FilterCard from '../components/filtercard';
import ExploreNavBar from '../components/explore_navbar';
import CourseList from '../components/courselist';
import BreadCrumbs from '../components/breadcrumbs';

interface Course {
    dept: string;
    code: string;
    name: string;
    ratings?: number;
    difficulty?: number;
    avgGrade?: number;
    enjoyed?: number;
    credit: number;
}

const Explore: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [maxDifficulty, setMaxDifficulty] = useState<number>(1);
    const [sortCriteria, setSortCriteria] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<boolean>(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/courses/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Course[] = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleSort = (criteria: string) => {
        if (sortCriteria === criteria) {
            setSortOrder(!sortOrder);
        } else {
            setSortCriteria(criteria);
            setSortOrder(true);
        }
    };

    return (
        <div className="flex flex-col bg-neutral-100 min-h-screen">
            <ExploreNavBar />
            <BreadCrumbs />
            <div className="flex-1 p-6 container mx-auto grid grid-cols-4 gap-4">
                {/* Courses Table */}
                <div className="col-span-3 bg-neutral-100">
                    <h1 className="text-2xl font-bold mb-4 text-red-500">Explore Courses</h1>

                    {/* Course List */}
                    <CourseList
                        courses={courses.map(course => ({
                            ...course,
                            prefix: `${course.dept.toUpperCase()} ${course.code}` // Create prefix from dept and code
                        }))}
                        minRating={minRating}
                        maxDifficulty={maxDifficulty}
                        sortCriteria={sortCriteria}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                    />
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
