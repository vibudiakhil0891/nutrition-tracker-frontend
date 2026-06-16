import { useState } from "react";
import axios from "axios";

function Foods() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const searchFood = async () => {
        const res = await axios.get(
            `http://127.0.0.1:8000/api/food/search/?q=${query}`
        );

        setResults(res.data);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

            <h1 className="text-2xl font-bold mb-4">
                🍎 Food Database Search
            </h1>

            <div className="flex gap-2 mb-6">
                <input
                    className="p-3 w-full bg-black/30 rounded"
                    placeholder="Search food (rice, chicken...)"
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button
                    onClick={searchFood}
                    className="bg-green-500 px-6 rounded"
                >
                    Search
                </button>
            </div>

            <div className="grid gap-4">
                {results.map((food) => (
                    <div
                        key={food.id}
                        className="bg-white/5 p-4 rounded border border-white/10"
                    >
                        <h2 className="text-xl font-bold">{food.name}</h2>
                        <p>Calories: {food.calories}</p>
                        <p>Protein: {food.protein}g</p>
                        <p>Carbs: {food.carbs}g</p>
                        <p>Fat: {food.fat}g</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Foods;