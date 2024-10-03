import React from 'react';

interface CourseListProps {
    courses: { dept: string; code: string; name: string }[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
    return (
        <div className="overflow-auto">
            <table className="table-auto w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6">Dept | Code</th>
                        <th className="py-3 px-6">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="py-3 px-6 text-red-500">
                                {course.dept} {course.code}
                            </td>
                            <td className="py-3 px-6 text-black">
                                {course.name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;
