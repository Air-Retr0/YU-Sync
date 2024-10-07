import React from 'react';
import { Link } from 'react-router-dom';

interface Course {
    dept: string;
    code: string;
    name: string;
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

const CourseList: React.FC<CourseListProps> = ({
    courses = [],
    minRating,
    maxDifficulty,
    sortCriteria,
    sortOrder,
    handleSort
}) => {
    // Filter courses based on Rating and Difficulty
    const filteredCourses = courses.filter(course => {
        const ratingCondition = course.ratings === undefined || course.ratings >= minRating;
        const difficultyCondition = course.difficulty === undefined || course.difficulty <= maxDifficulty;

        return ratingCondition && difficultyCondition;
    });


    const sortedCourses = filteredCourses.sort((a, b) => {
        if (sortCriteria === '') return 0;

        // Sort by department
        if (sortCriteria === 'dept') {
            return sortOrder ? a.dept.localeCompare(b.dept) : b.dept.localeCompare(a.dept);
        }

        // Sort by course code (first character)
        if (sortCriteria === 'code') {
            const aYear = parseInt(a.code.charAt(0), 10) || 9;
            const bYear = parseInt(b.code.charAt(0), 10) || 9;
            if (a.dept === b.dept) {
                return sortOrder ? aYear - bYear : bYear - aYear;
            }
            return sortOrder ? a.dept.localeCompare(b.dept) : b.dept.localeCompare(a.dept);
        }

        if (sortCriteria === 'ratings') {
            return sortOrder ? (a.ratings || 0) - (b.ratings || 0) : (b.ratings || 0) - (a.ratings || 0);
        }
        if (sortCriteria === 'difficulty') {
            return sortOrder ? (a.difficulty || 0) - (b.difficulty || 0) : (b.difficulty || 0) - (a.difficulty || 0);
        }
        if (sortCriteria === 'avgGrade') {
            return sortOrder ? (a.avgGrade || 0) - (b.avgGrade || 0) : (b.avgGrade || 0) - (a.avgGrade || 0);
        }
        if (sortCriteria === 'enjoyed') {
            return sortOrder ? (a.enjoyed || 0) - (b.enjoyed || 0) : (b.enjoyed || 0) - (a.enjoyed || 0);
        }

        return 0; // Base case
    });

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 text-gray-700 font-bold">
                Total Courses: {filteredCourses.length}
            </div>
            {sortedCourses.length > 0 ? (
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th onClick={() => handleSort('dept')} className="py-2 px-4 text-left cursor-pointer text-red-600">Dept</th>
                            <th onClick={() => handleSort('code')} className="py-2 px-4 text-left cursor-pointer text-red-600">Code</th>
                            <th onClick={() => handleSort('name')} className="py-2 px-4 text-left cursor-pointer">Name</th>
                            <th onClick={() => handleSort('ratings')} className="py-2 px-4 text-left cursor-pointer">Rating</th>
                            <th onClick={() => handleSort('difficulty')} className="py-2 px-4 text-left cursor-pointer">Difficulty</th>
                            <th onClick={() => handleSort('avgGrade')} className="py-2 px-4 text-left cursor-pointer">Grade</th>
                            <th onClick={() => handleSort('enjoyed')} className="py-2 px-4 text-left cursor-pointer">Enjoyed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCourses.map((course, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4 text-red-600">
                                    <Link to={`/explore/${course.dept.toLowerCase()}`}>{course.dept}</Link>
                                </td>
                                <td className="py-2 px-4 text-red-600">
                                    <Link to={`/explore/${course.dept.toLowerCase()}/${course.code}`}>{course.code}</Link>
                                </td>
                                <td className="py-2 px-4 text-black">{course.name}</td>
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
        </div>
    );
};

export default CourseList;
