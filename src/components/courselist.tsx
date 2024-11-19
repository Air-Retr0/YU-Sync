import React from 'react';
import { Link } from 'react-router-dom';

// yea i'ma just learn firmware dev, I can't do this anymore

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

const CourseList: React.FC<CourseListProps> = ({
    courses = [],
    minRating,
    maxDifficulty,
    sortCriteria,
    sortOrder,
    handleSort
}) => {
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
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="table table-lg min-w-full">
                <thead className="bg-gray-200 text-red-500">
                    <tr>
                        <th></th> {/* None of this shit workssssssssssssss */}
                        <th onClick={() => handleSort('dept')} className="py-2 px-4 cursor-pointer">Prefix</th>
                        <th onClick={() => handleSort('name')} className="py-2 px-4 cursor-pointer">Name</th>
                        <th onClick={() => handleSort('credit')} className="py-2 px-4 cursor-pointer">Credits</th>
                        <th onClick={() => handleSort('ratings')} className="py-2 px-4 cursor-pointer">Rating</th>
                        <th onClick={() => handleSort('difficulty')} className="py-2 px-4 cursor-pointer">Difficulty</th>
                        <th onClick={() => handleSort('avgGrade')} className="py-2 px-4 cursor-pointer">Grade</th>
                        <th onClick={() => handleSort('enjoyed')} className="py-2 px-4 cursor-pointer">Enjoyed</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCourses.map((course, index) => (
                        <tr key={index} className="border-b">
                            <th>{index + 1}</th>
                            <td className="py-2 px-4">
                                <Link to={`/explore/${course.dept.toLowerCase()}/${course.code.toLowerCase()}`}>
                                    <span className='text-red-500'>{course.dept.toUpperCase()}</span> <span className='text-red-700'>{course.code}</span>
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
        </div>
    );
};

export default CourseList;
