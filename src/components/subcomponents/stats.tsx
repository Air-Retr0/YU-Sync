import { useEffect, useState } from "react";
import { FaFire, FaStar, FaUserGraduate } from "react-icons/fa";
import callAPI from "../../utils/apicall";

const StatsSection = ({ courseId }) => {
  const [averageRating, setAverageRating] = useState<string>("N/A");
  const [difficulty, setDifficulty] = useState<string>("N/A");

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await callAPI
        .from("comments")
        .select("rating, difficulty")
        .eq("course_id", courseId);

      if (error || !data || data.length === 0) return;

      const validRatings = data.map(c => c.rating).filter(r => r !== null);
      const validDifficulties = data.map(c => c.difficulty).filter(d => d !== null);

      if (validRatings.length > 0) {
        const totalRating = validRatings.reduce((sum, r) => sum + r, 0);
        setAverageRating((totalRating / validRatings.length).toFixed(1));
      }

      if (validDifficulties.length > 0) {
        const totalDifficulty = validDifficulties.reduce((sum, d) => sum + d, 0);
        setDifficulty((totalDifficulty / validDifficulties.length).toFixed(1));
      }
    };

    fetchStats();
  }, [courseId]);

  return (
    <section className="flex space-x-4 mb-8">
      <div className="stat bg-white p-6 rounded-lg shadow-md w-1/3">
        <div className="stat-figure text-primary">
          <FaFire className="text-red-500 h-8 w-8" />
        </div>
        <div className="stat-title text-black">Difficulty</div>
        <div className="stat-value text-purple-400">{difficulty}/5</div>
      </div>

      <div className="stat bg-white p-6 rounded-lg shadow-md w-1/3">
        <div className="stat-figure text-secondary">
          <FaStar className="text-yellow-500 h-8 w-8" />
        </div>
        <div className="stat-title text-black">Course Rating</div>
        <div className="stat-value text-rose-300">{averageRating}</div>
      </div>

      <div className="stat bg-white p-6 rounded-lg shadow-md w-1/3">
        <div className="stat-figure text-secondary">
          <FaUserGraduate className="text-blue-500 h-8 w-8" />
        </div>
        <div className="stat-title text-black">Average Grade</div>
        <div className="stat-value text-gray-900">Test</div>
        <div className="stat-desc text-gray-600">will replace with ? operator</div>
      </div>
    </section>
  );
};

export default StatsSection;
