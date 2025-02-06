import React, { useEffect, useState } from 'react';
import FilterCard from '../components/subcomponents/filtercard';
import NavBar from '../components/navbar';
import CourseList from '../components/courselist';
import callAPI from '../utils/apicall';
import Footer from '../components/footer';
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
                const response = await callAPI.from(`courses`).select('*');
                if (response.error) {
                    throw response.error;
                }
                const data: Course[] = response.data;
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
        <>
            <div className="flex flex-col bg-neutral-100 min-h-screen">
                <NavBar />
                <BreadCrumbs />
                <div className="flex-1 p-6 container mx-auto grid grid-cols-4 gap-4">
                    <div className="col-span-3 bg-neutral-100">
                        <h1 className="text-2xl font-bold mb-4 text-red-500">Explore Popular Courses</h1>

                        <CourseList
                            courses={courses.map(course => ({
                                ...course,
                                prefix: `${course.dept.toUpperCase()} ${course.code}` // Create prefix from dept and code, weird logic amirite
                            }))}
                            minRating={minRating}
                            maxDifficulty={maxDifficulty}
                            sortCriteria={sortCriteria}
                            sortOrder={sortOrder}
                            handleSort={handleSort}
                        />
                    </div>

                    <div className="col-span-1">
                        <FilterCard
                            minRating={minRating}
                            maxDifficulty={maxDifficulty}
                            setMinRating={setMinRating}
                            setMaxDifficulty={setMaxDifficulty}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Explore;