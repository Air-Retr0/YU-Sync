/* Why, the FUCK, is making UI components so hard??? 
I am not built for this, thank the OpenAI messiahs 
for customization*/

import React from "react";

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

    return (
        <div className="bg-white shadow-lg rounded-xl border border-red-500 p-6 space-y-6">
            <h2 className="text-2xl font-bold text-red-500 text-center">Filter Courses</h2>

            <div className="space-y-6">
                <div>
                    <label className="flex justify-between text-gray-800 font-medium mb-2">
                        <span>Min Rating</span>
                        <span className="text-red-500">{getMarkValue(minRating)}</span>
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={maxIndex}
                        value={minRating}
                        onChange={(e) => setMinRating(parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-red-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-gray-800 font-medium mb-2">
                        <span>Max Difficulty</span>
                        <span className="text-red-500">{maxDifficulty}</span>
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={5}
                        value={maxDifficulty}
                        onChange={(e) => setMaxDifficulty(parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-red-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterCard;