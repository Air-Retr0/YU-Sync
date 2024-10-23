// Do not touch anything related to pagination, cuz this mf will get slowwwwwwwwwwwww

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Course {
    dept: string;
    code: string;
    name: string;
    credit: number;
    ratings?: number;
    difficulty?: number;
    avgGrade?: number;
    enjoyed?: number;
}

interface CourseListProps {
    courses: Course[];
    minRating: number;
    maxDifficulty: number;
    sortCriteria: string;
    sortOrder: boolean;
    handleSort: (criteria: string) => void;
}

const PAGE_SIZE = 73; // evenly divides into total course amt

const CourseList: React.FC<CourseListProps> = ({
    courses = [],
    minRating,
    maxDifficulty,
    sortCriteria,
    sortOrder,
    handleSort
}) => {
    const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const filteredCourses = courses.filter(course => {
        const ratingCondition = course.ratings === undefined || course.ratings >= minRating;
        const difficultyCondition = course.difficulty === undefined || course.difficulty <= maxDifficulty;
        return ratingCondition && difficultyCondition;
    });

    const sortedCourses = filteredCourses.sort((a, b) => {
        if (sortCriteria === '') return 0;
        if (sortCriteria === 'dept') return sortOrder ? a.dept.localeCompare(b.dept) : b.dept.localeCompare(a.dept);
        if (sortCriteria === 'ratings') return sortOrder ? (a.ratings || 0) - (b.ratings || 0) : (b.ratings || 0) - (a.ratings || 0);
        if (sortCriteria === 'difficulty') return sortOrder ? (a.difficulty || 0) - (b.difficulty || 0) : (b.difficulty || 0) - (a.difficulty || 0);
        if (sortCriteria === 'avgGrade') return sortOrder ? (a.avgGrade || 0) - (b.avgGrade || 0) : (b.avgGrade || 0) - (a.avgGrade || 0);
        if (sortCriteria === 'enjoyed') return sortOrder ? (a.enjoyed || 0) - (b.enjoyed || 0) : (b.enjoyed || 0) - (a.enjoyed || 0);
        return 0;
    });

    useEffect(() => {
        const loadMoreCourses = () => {
            const startIndex = (page - 1) * PAGE_SIZE;
            const nextCourses = sortedCourses.slice(startIndex, startIndex + PAGE_SIZE);

            if (nextCourses.length > 0) {
                setDisplayedCourses(prevCourses => [...prevCourses, ...nextCourses]);
                if (startIndex + PAGE_SIZE >= filteredCourses.length) {
                    setHasMore(false); // No more courses to load
                }
            } else {
                setHasMore(false);
            }
        };

        loadMoreCourses();
    }, [page, sortedCourses, filteredCourses.length]);

    // Handle scroll event to detect when to load more courses
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                >= document.documentElement.offsetHeight
                && hasMore
            ) {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasMore]);

    const getCreditColor = (credit: number) => {
        if (credit <= 2) {
            return 'text-red-500';
        } else if (credit === 3) {
            return 'text-green-500';
        } else if (credit >= 6) {
            return 'text-purple-500';
        }
        return 'text-black';
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 text-gray-700 font-bold">
                Total Courses: {displayedCourses.length} / {filteredCourses.length}
            </div>
            {displayedCourses.length > 0 ? (
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th onClick={() => handleSort('dept')} className="py-2 px-4 text-left cursor-pointer text-red-600">Prefix</th>
                            <th onClick={() => handleSort('name')} className="py-2 px-4 text-left cursor-pointer text-red-600">Name</th>
                            <th onClick={() => handleSort('credit')} className="py-2 px-4 text-left cursor-pointer text-red-600">Credits</th>
                            <th onClick={() => handleSort('ratings')} className="py-2 px-4 text-left cursor-pointer text-red-600">Rating</th>
                            <th onClick={() => handleSort('difficulty')} className="py-2 px-4 text-left cursor-pointer text-red-600">Difficulty</th>
                            <th onClick={() => handleSort('avgGrade')} className="py-2 px-4 text-left cursor-pointer text-red-600">Grade</th>
                            <th onClick={() => handleSort('enjoyed')} className="py-2 px-4 text-left cursor-pointer text-red-600">Enjoyed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedCourses.map((course, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-6 text-red-600 flex items-center space-x-2">
                                    <Link to={`/explore/${course.dept.toLowerCase()}/${course.code.toLowerCase()}`}>
                                        <span>{course.dept.toUpperCase()}</span> <span>{course.code}</span>
                                    </Link>
                                </td>
                                <td className="py-2 px-4 text-black">{course.name}</td>
                                <td className={`py-2 px-4 ${getCreditColor(course.credit)}`}>
                                    {course.credit !== undefined ? course.credit : '-'}
                                </td>
                                <td className="py-2 px-4">{course.ratings !== undefined ? course.ratings : '-'}</td>
                                <td className="py-2 px-4">{course.difficulty !== undefined ? course.difficulty : '-'}</td>
                                <td className="py-2 px-4">{course.avgGrade !== undefined ? course.avgGrade : '-'}</td>
                                <td className="py-2 px-4">{course.enjoyed !== undefined ? course.enjoyed : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No courses available.</p>
            )}
            {!hasMore && <p>No more courses available.</p>}
        </div>
    );
};

export default CourseList;
