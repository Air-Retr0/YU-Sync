import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navbar';
import BreadCrumbs from '../components/breadcrumbs';
import callAPI from '../utils/apicall';

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
                const response = await callAPI.from(`courses`).select(`*`).eq('dept', dept).eq('code', code);
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

    if (!courseData) return <span className="loading loading-spinner text-error"></span>;

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

                    <section className="flex space-x-4 mb-8">
                        <div className="stat bg-white p-6 rounded-lg shadow-md w-1/3">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Difficulty</div>
                            <div className="stat-value text-primary">x/5</div>
                            <div className="stat-desc text-gray-600"></div>
                        </div>
                        <div className="stat bg-white p-6 rounded-lg shadow-md w-1/3">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Course Rating</div>
                            <div className="stat-value text-secondary">3.8</div>
                            <div className="stat-desc text-gray-600">Placeholder</div>
                        </div>
                        <div className="stat bg-white p-6 rounded-lg shadow-md w-1/3">
                            <div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-value text-gray-900">86%</div>
                            <div className="stat-title">Average Grade</div>
                            <div className="stat-desc text-gray-600">will replace with ? operator</div>
                        </div>
                    </section>

                    {/* User Reviews Section | this is most likely gonna be a component.*/}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">User Reviews</h2>
                        <div className="space-y-6">
                            <div className="bg-white p-6 shadow-lg rounded-lg flex items-start space-x-4">
                                <img className="w-12 h-12 rounded-full" src="/path-to-avatar.jpg" alt="User Avatar" />
                                <div>
                                    <p className="text-gray-700">“This course was very insightful. Loved it!”</p>
                                    <div className="text-red-600 text-lg mt-2">
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
                                    <div className="text-red-600 text-lg mt-2">
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
                </div>
            </div>
        </>
    );
}

export default CourseSubPage;
