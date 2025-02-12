import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar';
import BreadCrumbs from '../components/breadcrumbs';
import callAPI from '../utils/apicall';
import StatsSection from '../components/subcomponents/stats';
import CommentsBox from '../auth/comments';

interface SubPageCourseDetails {
    dept: string;
    code: string;
    name: string;
    credit: number;
    desc: string;
    prereqs: string;
}

function CourseSubPage() {
    const { dept, code } = useParams<{ dept: string; code: string }>();
    const [courseData, setCourseData] = useState<SubPageCourseDetails | null>(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await callAPI
                    .from(`courses`)
                    .select(`*`)
                    .eq('dept', dept)
                    .eq('code', code);
                if (response.error) {
                    console.error("Error fetching course data:", response.error);
                } else if (response.data.length > 0) {
                    setCourseData(response.data[0]);
                } else {
                    console.error("Course not found");
                }
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };

        fetchCourseData();
    }, [dept, code]);

    if (!courseData) return (
        <div className="hero min-h-screen bg-gray-50 flex justify-center items-center">
            <span>
                <span className="loading loading-spinner loading-lg"></span>
            </span>
        </div>
    );

    return (
        <>
            <NavBar />
            <BreadCrumbs />
            <div className="bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <section className="bg-white shadow-lg p-6 rounded-lg mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">{courseData.name}</h1>
                        <div className="flex justify-between items-center mt-4">
                            <div className="text-lg font-semibold text-red-600">
                                <span>Code: </span> {courseData.code}
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                                <span>Credits: </span>{courseData.credit}
                            </div>
                        </div>
                        <div className="text-lg font-semibold text-red-600 mt-2">
                            <span>Department: </span>{courseData.dept.toUpperCase()}
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed mt-4">{courseData.desc}</p>
                    </section>

                    <StatsSection />
                    <CommentsBox courseId={courseData.code} courseDept={courseData.dept} />

                </div>
            </div>
        </>
    );
}

export default CourseSubPage;
