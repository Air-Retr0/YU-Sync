import { FaFire, FaStar, FaUserGraduate } from "react-icons/fa";

const StatsSection = () => {
  return (
    <section className="flex space-x-4 mb-8">
      <div className="stat bg-white p-6 rounded-lg shadow-md w-1/3">
        <div className="stat-figure text-primary">
          <FaFire className="text-red-500 h-8 w-8" />
        </div>
        <div className="stat-title text-black">Difficulty</div>
        <div className="stat-value text-purple-400">x/5</div>
      </div>

      <div className="stat bg-white p-6 rounded-lg shadow-md w-1/3">
        <div className="stat-figure text-secondary">
          <FaStar className="text-yellow-500 h-8 w-8" />
        </div>
        <div className="stat-title text-black">Course Rating</div>
        <div className="stat-value text-rose-300">3.8</div>
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
