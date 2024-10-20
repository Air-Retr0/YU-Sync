import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ExploreNavBar from '../../components/explore_navbar';
import BreadCrumbs from '../../components/breadcrumbs';

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
                const response = await axios.get<SubPageCourseDetails>(`http://127.0.0.1:8000/api/courses/${dept}/${code}/`);
                console.log("Course data fetched:", response.data);
                setCourseData(response.data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };

        if (dept && code) {
            fetchCourseData();
        }
    }, [dept, code]);

    if (!courseData) return <span className="loading loading-spinner text-error"></span>;

    return (
        <>
            <ExploreNavBar />
            <BreadCrumbs />
            <div className="hero bg-white min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">{courseData.name}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseSubPage;
