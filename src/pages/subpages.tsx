import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface SubPageCourseDetails {
    dept: string;
    code: string;
    name: string;
    credit: number;
    desc: string;

}

function CourseSubPage() {
    const { dept, code } = useParams<{ dept: string; code: string }>();
    const [courseData, setCourseData] = useState<SubPageCourseDetails | null>(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get<SubPageCourseDetails>(`/api/courses/${dept}/${code}/`);
                setCourseData(response.data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };

        fetchCourseData();
    }, [dept, code]);

    if (!courseData) return <div>Loading...</div>;

    return (
        <div className="course-page">
            <h1>{courseData.name}</h1>
            <p>Course Code: {courseData.code}</p>
            <p>Credits: {courseData.credit}</p>
            <p>Description: {courseData.desc}</p>
            {/* Additional course details */}
        </div>
    );
}

export default CourseSubPage;
