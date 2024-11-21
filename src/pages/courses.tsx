// this is just a collective dump for all the courses

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import callAPI from '../utils/apicall';
import NavBar from '../components/navbar';

interface Course {
  dept: string;
  code: string;
  name: string;
}

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const pageSize = 40;

  const fetchCourses = async (page: number) => {
    try {
      setLoading(true);

      const offset = (page - 1) * pageSize;
      const response = await callAPI
        .from('courses')
        .select('dept, code, name')
        .range(offset, offset + pageSize - 1);

      if (response.error) throw response.error;

      const totalCoursesResponse = await callAPI.from('courses').select('*', { count: 'exact' });

      setCourses(response.data);
      setTotalPages(Math.ceil((totalCoursesResponse.count ?? 0) / pageSize));
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNavigateCourse = (course: Course) => {
    navigate(`/explore/courses/${course.dept.toLowerCase()}/${course.code}`);
  };

  if (loading) {
    return (
      <div>
        <span>
          <span className="loading loading-dots loading-sm"></span>
        </span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="hero bg-white shadow-md rounded-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Courses</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.map((course, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow hover:bg-gray-50 cursor-pointer"
                onClick={() => handleNavigateCourse(course)}
              >
                <h2 className="font-bold text-lg text-red-500">
                  {course.dept.toUpperCase()} {course.code}
                </h2>
                <p className="text-gray-700">{course.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center items-center space-x-4">
            <button
              className={`btn btn-outline ${currentPage === 1 ? 'btn-disabled' : ''}`}
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              className={`btn btn-outline ${currentPage === totalPages ? 'btn-disabled' : ''}`}
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesPage;