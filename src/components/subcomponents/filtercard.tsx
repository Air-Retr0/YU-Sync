/* Why, the FUCK, is making UI components so hard??? 
I am not built for this, thank the OpenAI messiahs 
for customization */

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FilterCardProps {
    minRating: number;
    maxDifficulty: number;
    setMinRating: (value: number) => void;
    setMaxDifficulty: (value: number) => void;
}

const FilterCard: React.FC<FilterCardProps> = ({
    minRating,
    maxDifficulty,
    setMinRating,
    setMaxDifficulty,
}) => {
    const marks = [1, 50, 100, 250, 500];
    const maxIndex = marks.length - 1;

    const getMarkValue = (index: number) => marks[index];

    const [filters, setFilters] = useState({
        noPrereqs: false,
        fall: false,
        winter: false,
        summer: false,
    });

    const toggleFilter = (key: keyof typeof filters) => { // ts so ass
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const courseLevels = ["1XXX", "2XXX", "3XXX", "4XXX"];
    const termFilters = ["No Prereqs", "Fall", "Winter", "Summer"];

    return (
        <div className="bg-white shadow-xl rounded-2xl border-2 border-red-500 p-6 space-y-6">
            <h2 className="text-3xl font-extrabold text-red-500 text-center">Filter Courses</h2>

            <div className="space-y-4">
                <label className="flex justify-between text-gray-800 font-medium">
                    <span>Min Rating</span>
                    <span className="text-red-500 font-bold">{getMarkValue(minRating)}</span>
                </label>
                <input
                    type="range"
                    min={0}
                    max={maxIndex}
                    value={minRating}
                    onChange={(e) => setMinRating(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none bg-gray-300 accent-red-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
            </div>

            <div className="space-y-4">
                <label className="flex justify-between text-gray-800 font-medium">
                    <span>Max Difficulty</span>
                    <span className="text-red-500 font-bold">{maxDifficulty}</span>
                </label>
                <input
                    type="range"
                    min={1}
                    max={5}
                    value={maxDifficulty}
                    onChange={(e) => setMaxDifficulty(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none bg-gray-300 accent-red-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-gray-800 font-medium">Filters</label>
                {termFilters.map((term, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            className="hidden peer"
                            checked={Object.values(filters)[index]}
                            onChange={() => toggleFilter(Object.keys(filters)[index] as keyof typeof filters)}
                        />
                        <motion.div
                            className="w-5 h-5 border-2 border-red-500 rounded-md flex items-center justify-center peer-checked:bg-red-500 transition"
                        >
                            {Object.values(filters)[index] && <span className="text-white text-xs">✔</span>}
                        </motion.div>
                        <span className="text-gray-800">{term}</span>
                    </label>
                ))}
            </div>

            <div>
                <label className="block text-gray-800 font-medium mb-2">Course Level</label>
                <div className="flex flex-wrap gap-3">
                    {courseLevels.map((level, index) => (
                        <span
                            key={index}
                            className={`px-3 py-1 text-sm font-semibold rounded-full ${index === 0 ? "bg-blue-500 text-white" :
                                index === 1 ? "bg-green-500 text-white" :
                                    index === 2 ? "bg-yellow-500 text-black" :
                                        "bg-purple-500 text-white"
                                }`}
                        >
                            {level}
                        </span>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-300 pt-4 space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Applied Filters</h3>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(filters)
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        .filter(([_, value]) => value)
                        .map(([key], index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="px-3 py-1 bg-red-500 text-white text-sm rounded-full flex items-center gap-2"
                            >
                                {key.replace(/([A-Z])/g, " $1").trim()}
                            </motion.div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default FilterCard;
