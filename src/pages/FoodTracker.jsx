import { useEffect, useState } from "react";
import axios from "axios";

function FoodTracker() {
    const [foodName, setFoodName] = useState("");
    const [calories, setCalories] = useState("");
    const [foods, setFoods] = useState([]);
    const [total, setTotal] = useState(0);

    const fetchFoods = async () => {
        const res = await axios.get("https://nutrition-tracker-backend-zpws.onrender.com/api/food/today/");
        setFoods(res.data.foods);
        setTotal(res.data.total_calories);
    };

    const addFood = async () => {
        await axios.post("https://nutrition-tracker-backend-zpws.onrender.com/api/food/add/", {
            food_name: foodName,
            calories: calories,
        });

        setFoodName("");
        setCalories("");
        fetchFoods();
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

            <h1 className="text-2xl font-bold mb-4">
                🍽 Daily Food Tracker
            </h1>

            {/* INPUT */}
            <div className="flex gap-2 mb-6">
                <input
                    className="p-3 bg-black/30 rounded w-full"
                    placeholder="Food name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                />

                <input
                    className="p-3 bg-black/30 rounded w-40"
                    placeholder="Calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                />

                <button
                    onClick={addFood}
                    className="bg-green-500 px-6 rounded"
                >
                    Add
                </button>
            </div>

            {/* TOTAL */}
            <div className="bg-white/5 p-4 rounded mb-6">
                <h2 className="text-xl">
                    Total Calories: {total}
                </h2>
            </div>

            {/* LIST */}
            <div className="grid gap-3">
                {foods.map((f) => (
                    <div
                        key={f.id}
                        className="bg-white/5 p-4 rounded border border-white/10"
                    >
                        <h2 className="font-bold">{f.food_name}</h2>
                        <p>Calories: {f.calories}</p>
                        <p>Protein: {f.protein}g</p>
                        <p>Carbs: {f.carbs}g</p>
                        <p>Fat: {f.fat}g</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default FoodTracker;