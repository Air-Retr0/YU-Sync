import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ExploreNavBar from '../components/explore_navbar';
import BreadCrumbs from '../components/breadcrumbs';

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

    if (!courseData) return <span className="loading loading-spinner text-error"></span>;

    return (
        <>
            <ExploreNavBar />
            <BreadCrumbs />
            <h1>{courseData.desc}</h1>
        </>
    );
}

export default CourseSubPage;
