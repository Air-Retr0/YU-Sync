import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    if (!courseData) return <span className="loading loading-spinner text-error"></span> // ignore the text-error, it's just the red color load

    return (
        <div className="breadcrumbs text-sm">
            <ul>
                <li>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        <Link to="/explore">Explore</Link>
                    </a>
                </li>
                <li>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        {courseData.dept}
                    </a>
                </li>
                <li>
                    <span className="inline-flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        {courseData.name}
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default CourseSubPage;
