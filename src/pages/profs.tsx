import React, { useState, useEffect } from "react";
import callAPI from "../utils/apicall";
import NavBar from "../components/navbar";

interface Professor {
  dept: string;
  first: string;
  last: string;
}

const ProfessorsPage: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 40;

  const fetchProfessors = async (page: number) => {
    try {
      setLoading(true);

      const offset = (page - 1) * pageSize;
      const response = await callAPI
        .from("profs")
        .select('dept, first, last')
        .range(offset, offset + pageSize - 1);

      if (response.error) throw response.error;

      const totalProfessorsResponse = await callAPI.from("profs").select("*", { count: "exact" });

      setProfessors(response.data);
      setTotalPages(Math.ceil((totalProfessorsResponse.count ?? 0) / pageSize));
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessors(currentPage);
  }, [currentPage]);

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="hero min-h-screen bg-gray-50 flex justify-center items-center">
        <span>
          <span className="loading loading-dots loading-lg"></span>
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="hero min-h-screen bg-gray-50 text-red-600">{error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="hero bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Professors</h1>

          <div className="space-y-4">
            {professors.length > 0 ? (
              professors.map((prof, index) => (
                <details key={index} className="group bg-white border rounded-lg shadow-sm">
                  <summary className="flex justify-between items-center px-4 py-3 cursor-pointer group-open:text-red-600">
                    <span className="font-medium text-lg text-gray-800">
                      {prof.first} {prof.last}
                    </span>
                  </summary>
                  <div className="px-4 py-3 border-t text-gray-700">
                    <p>
                      <strong>Department:</strong> {prof.dept}
                    </p>
                  </div>
                </details>
              ))
            ) : (
              <div>No professors found.</div>
            )}

          </div>

          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              className={`btn btn-outline ${currentPage === 1 ? "btn-disabled" : ""}`}
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              className={`btn btn-outline ${currentPage === totalPages ? "btn-disabled" : ""}`}
              onClick={() => handlePageChange("next")}
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

export default ProfessorsPage;
