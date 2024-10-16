import React, { useEffect, useState } from 'react';
import FilterCard from '../components/filtercard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ExploreNavBar from '../components/explore_navbar';
import BreadCrumbs from '../components/breadcrumbs';

interface Course {
    dept: string;
    code: string;
    name: string;
    prereqs: string;
    desc: string;
    ratings?: number;
    difficulty?: number;
    avgGrade?: number;
    enjoyed?: number;
    credit: number;
    prefix: string;
}

const SubPageExplore: React.FC = () => {
    const { dept } = useParams<{ dept: string }>();
    const [courses, setCourses] = useState<Course[]>([]);
    const [minRating, setMinRating] = useState<number>(0);
    const [maxDifficulty, setMaxDifficulty] = useState<number>(1);
    const [sortCriteria, setSortCriteria] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<boolean>(true);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!dept) return;
            try {
                const response = await axios.get<Course[]>(`http://127.0.0.1:8000/api/courses/${dept}/`);
                const updatedCourses = response.data.map(course => ({
                    ...course,
                    prefix: `${course.dept} ${course.code}`,
                    dept: course.dept.toUpperCase()
                }));
                setCourses(updatedCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [dept]);

    const handleSort = (criteria: keyof Course) => {
        const sortedCourses = [...courses].sort((a, b) => {
            let valueA = a[criteria];
            let valueB = b[criteria];

            if (criteria === 'code') {
                const numA = parseInt(a.code, 10);
                const numB = parseInt(b.code, 10);
                valueA = numA;
                valueB = numB;
            }

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortOrder
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return sortOrder ? valueA - valueB : valueB - valueA;
            }

            return 0;
        });

        setCourses(sortedCourses);
        if (sortCriteria === criteria) {
            setSortOrder(!sortOrder);
        } else {
            setSortCriteria(criteria);
            setSortOrder(true);
        }
    };

    const getCreditColor = (credit: number) => {
        if (credit <= 2) {
            return 'text-red-500';
        } else if (credit === 3) {
            return 'text-blue-500';
        } else if (credit >= 6) {
            return 'text-purple-500';
        }
        return 'text-black';
    };

    return (
        <>
            <ExploreNavBar />
            <div className="flex flex-col bg-neutral-100 min-h-screen">
                <BreadCrumbs />
                <div className="flex-1 p-6 container mx-auto grid grid-cols-4 gap-4">
                    <div className="col-span-3 bg-neutral-100">
                        <h1 className="text-2xl font-bold mb-4 text-red-500">Explore Courses in {dept?.toUpperCase()}</h1>

                        {/* Course List */}
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2" onClick={() => handleSort('dept')}>Department</th>
                                    <th className="px-4 py-2" onClick={() => handleSort('code')}>Course Code</th>
                                    <th className="px-4 py-2" onClick={() => handleSort('credit')}>Credits</th>
                                    <th className="px-4 py-2" onClick={() => handleSort('name')}>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => (
                                    <tr key={index} className="bg-gray-100">
                                        <td className="border px-4 py-2 text-red-500">{course.dept}</td>
                                        <td className="border px-4 py-2 text-red-500">{course.code}</td>
                                        <td className={`py-2 px-4 ${getCreditColor(course.credit)}`}>
                                            {course.credit !== undefined ? course.credit : '-'}
                                        </td>
                                        <td className="border px-4 py-2 text-black">{course.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
        </>
    );
};

export default SubPageExplore;