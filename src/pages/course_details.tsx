import React from 'react';
import { useParams } from 'react-router-dom';

interface Course {
    dept: string;
    code: string;
    name: string;
    ratings?: number;
    difficulty?: number;
    avgGrade?: number;
    enjoyed?: number;
    desc?: string;
}

const CourseDetails: React.FC = () => {
    const { dept, code } = useParams<{ dept: string, code: string }>();  // Get the department and code from URL
    const [course, setCourse] = React.useState<Course | null>(null);

    React.useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/courses/');
                const data: Course[] = await response.json();
                // Find the specific course
                const foundCourse = data.find(course =>
                    course.dept.toLowerCase() === dept?.toLowerCase() &&
                    course.code === code
                );
                setCourse(foundCourse || null);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [dept, code]);

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold">{course.dept} {course.code}: {course.name}</h1>
            <p className="mt-4">Description: {course.desc || 'No description available'}</p>
            <ul className="mt-4">
                <li><strong>Ratings:</strong> {course.ratings || '-'}</li>
                <li><strong>Difficulty:</strong> {course.difficulty || '-'}</li>
                <li><strong>Average Grade:</strong> {course.avgGrade || '-'}</li>
                <li><strong>Enjoyed:</strong> {course.enjoyed || '-'}</li>
            </ul>
        </div>
    );
};

export default CourseDetails;
