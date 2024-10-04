import React from 'react';
import { useParams } from 'react-router-dom';
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

const DepartmentCourses: React.FC = () => {
    const { dept } = useParams<{ dept: string }>();  // God I love stack overflow
    const [courses, setCourses] = React.useState<Course[]>([]);

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/courses/');
                const data: Course[] = await response.json();
                // filter through the departments
                const filteredCourses = data.filter(course => course.dept.toLowerCase() === dept?.toLowerCase());
                setCourses(filteredCourses);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [dept]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Courses in {dept?.toUpperCase()}</h1>
            <CourseList
                courses={courses}
                minRating={0}
                maxDifficulty={10}
                sortCriteria={''}
                sortOrder={true}
                handleSort={() => { }}  // You can define sorting logic or reuse the same as explore
            />
        </div>
    );
};

export default DepartmentCourses;
