/* Why, the FUCK, is making UI components so hard??? 
I am not built for this, thank the OpenAI messiahs 
for customization*/


import React from 'react';

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
    return (
        <div
            className="bg-white shadow-lg rounded-xl p-6 space-y-6"
            style={{
                border: "1px solid #e63946",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
            }}
        >
            <h2
                className="text-2xl font-bold text-gray-800"
                style={{
                    color: "#e63946"
                }}
            >
                Filter Courses
            </h2>

            <div className="space-y-2">
                <label className="flex justify-between text-gray-800 font-semibold">
                    Min Rating
                    <span style={{ color: "#e63946" }}>{minRating}</span>
                </label>
                <input
                    type="range"
                    min={0}
                    max={5}
                    value={minRating}
                    onChange={(e) => setMinRating(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                        background: "#f0f0f0",
                        accentColor: "#e63946"
                    }}
                />
            </div>

            <div className="space-y-2">
                <label className="flex justify-between text-gray-800 font-semibold">
                    Max Difficulty
                    <span style={{ color: "#e63946" }}>{maxDifficulty}</span>
                </label>
                <input
                    type="range"
                    min={1}
                    max={5}
                    value={maxDifficulty}
                    onChange={(e) => setMaxDifficulty(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                        background: "#f0f0f0",
                        accentColor: "#e63946"
                    }}
                />
            </div>
        </div>
    );
};

export default FilterCard;
