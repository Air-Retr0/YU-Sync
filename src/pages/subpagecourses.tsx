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
            <div className='hero bg-white min-h-screen'>
                <div className='p-9'>
                    <section className="bg-white shadow-lg p-6 rounded-lg mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">{courseData.name}</h1>
                        <div className="flex justify-between items-center mt-4 mb-4">
                            <div className="text-lg font-semibold text-red-600">
                                <span>Code: </span> {courseData.code}
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                                <span>Credits: </span>{courseData.credit}
                            </div>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed">{courseData.desc}</p>
                    </section >
                </div>
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">User Reviews</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 shadow-lg rounded-lg flex items-start space-x-4">
                            <img className="w-12 h-12 rounded-full" src="/path-to-avatar.jpg" alt="User Avatar" />
                            <div>
                                <p className="text-gray-700">“This course was very insightful. Loved it!”</p>
                                <div className="text-red-600 text-lg">
                                    <div className="rating">
                                        <input type="radio" name="rating-1" className="mask mask-star bg-red-500" />
                                        <input type="radio" name="rating-1" className="mask mask-star bg-red-500" defaultChecked />
                                        <input type="radio" name="rating-1" className="mask mask-star bg-red-500" />
                                        <input type="radio" name="rating-1" className="mask mask-star bg-red-500" />
                                        <input type="radio" name="rating-1" className="mask mask-star bg-red-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg flex items-start space-x-4">
                            <img className="w-12 h-12 rounded-full" src="/path-to-avatar2.jpg" alt="User Avatar" />
                            <div>
                                <p className="text-gray-700">“Found the assignments challenging but rewarding.”</p>
                                <div className="text-red-600 text-lg">
                                    <div className="rating">
                                        <input type="radio" name="rating-2" className="mask mask-star bg-red-500" />
                                        <input type="radio" name="rating-2" className="mask mask-star bg-red-500" defaultChecked />
                                        <input type="radio" name="rating-2" className="mask mask-star bg-red-500" />
                                        <input type="radio" name="rating-2" className="mask mask-star bg-red-500" />
                                        <input type="radio" name="rating-2" className="mask mask-star bg-red-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </>
    );
}

export default CourseSubPage;
