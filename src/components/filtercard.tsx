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
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Filter Courses</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Min Rating</label>
                <input
                    type="range"
                    min={0}
                    max={5}
                    value={minRating}
                    onChange={(e) => setMinRating(parseInt(e.target.value))}
                    className="w-full"
                />
                <span>{minRating}</span>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Max Difficulty</label>
                <input
                    type="range"
                    min={1}
                    max={5}
                    value={maxDifficulty}
                    onChange={(e) => setMaxDifficulty(parseInt(e.target.value))}
                    className="w-full"
                />
                <span>{maxDifficulty}</span>
            </div>
        </div>
    );
};

export default FilterCard;
