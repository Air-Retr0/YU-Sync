import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import callAPI from '../utils/apicall';
import NavBar from '../components/navbar';
import BreadCrumbs from '../components/breadcrumbs';

interface GradProgram {
  name: string;
  is_diploma: boolean;
  campus: string;
}

const GradPrograms: React.FC = () => {
  const [programs, setPrograms] = useState<GradProgram[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const pageSize = 40;

  const fetchPrograms = async (page: number) => {
    try {
      setLoading(true);
      const offset = (page - 1) * pageSize;

      const response = await callAPI
        .from('grad_programs')
        .select('name, is_diploma, campus')
        .range(offset, offset + pageSize - 1);

      if (response.error) throw response.error;

      const totalProgramsResponse = await callAPI
        .from('grad_programs')
        .select('*', { count: 'exact' });

      setPrograms(
        response.data.map((grad: { name: string; is_diploma: boolean; campus: string }) => ({
          name: grad.name,
          is_diploma: grad.is_diploma,
          campus: grad.campus,
        }))
      );

      setTotalPages(Math.ceil((totalProgramsResponse.count ?? 0) / pageSize));
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms(currentPage);
  }, [currentPage]);

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNavigateProgram = (program: GradProgram) => {
    navigate(`/explore/programs/${program.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  if (loading) {
    return (
      <div className="hero bg-white min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner-large"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <BreadCrumbs />
      <div className="hero bg-white shadow-md rounded-lg min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Graduate Programs</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {programs.map((program, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow hover:bg-gray-50 cursor-pointer"
                onClick={() => handleNavigateProgram(program)}
              >
                <h2 className="font-bold text-lg text-red-500">{program.name}</h2>
                <p className="text-gray-700">
                  {program.is_diploma ? 'Graduate Diploma' : 'Graduate Degree'}
                </p>
                <p className="text-gray-600">{program.campus} Campus</p>
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

export default GradPrograms;
