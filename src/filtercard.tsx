import React from 'react';

interface FilterProps {
    minRating: number;
    setMinRating: React.Dispatch<React.SetStateAction<number>>;
    maxDifficulty: number;
    setMaxDifficulty: React.Dispatch<React.SetStateAction<number>>;
}

const FilterCard: React.FC<FilterProps> = ({
    minRating,
    setMinRating,
    maxDifficulty,
    setMaxDifficulty,
}) => {

    const handleMinRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinRating(Number(e.target.value));
    };

    const handleMinDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxDifficulty(Number(e.target.value));
    };

    return (
        <div className="fixed top-0 right-0 w-64 p-4 bg-white shadow-lg border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="mb-4">
                <label className="block mb-2">Min Rating</label>
                <input
                    type="range"
                    min={0}
                    max={5}
                    value={minRating}
                    className="range range-error"
                    onChange={handleMinRatingChange}
                />
                <p># of Ratings: {minRating}</p>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Max Difficulty</label>
                <input
                    type="range"
                    min={1}
                    max={5}
                    value={maxDifficulty}
                    className="range range-error"
                    onChange={handleMinDifficultyChange}
                />
                <p>Set your Difficulty: {maxDifficulty}</p>
            </div>
        </div>
    );
};

export default FilterCard;
