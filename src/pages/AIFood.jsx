import { useState } from "react";
import axios from "axios";

function AIFood() {
    const [goal, setGoal] = useState("maintain");
    const [veg, setVeg] = useState(false);
    const [calories, setCalories] = useState(2000);

    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    const generatePlan = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("access_token");

            const res = await axios.post(
                "https://nutrition-tracker-backend-zpws.onrender.com/api/ai/food/",
                {
                    goal,
                    veg,
                    calories
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setPlan(res.data.plan);

        } catch (err) {
            console.error("AI Error:", err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

            <h1 className="text-2xl font-bold mb-6">
                🤖 AI Diet Planner
            </h1>

            <div className="space-y-3 mb-6">

                {/* GOAL */}
                <select
                    className="p-3 bg-black/30 w-full rounded"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                >
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain</option>
                    <option value="gain">Gain Weight</option>
                </select>

                {/* CALORIES */}
                <input
                    className="p-3 bg-black/30 w-full rounded"
                    placeholder="Calories"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                />

                {/* VEG */}
                <label className="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        checked={veg}
                        onChange={(e) => setVeg(e.target.checked)}
                    />
                    Vegetarian
                </label>

                <button
                    onClick={generatePlan}
                    className="bg-green-500 px-6 py-2 rounded"
                >
                    {loading ? "Generating..." : "Generate Plan"}
                </button>

            </div>

            {/* RESULT */}
            {plan && (
                <div className="bg-white/5 p-4 rounded space-y-2">
                    <p><b>Breakfast:</b> {plan.breakfast}</p>
                    <p><b>Lunch:</b> {plan.lunch}</p>
                    <p><b>Dinner:</b> {plan.dinner}</p>
                    <p><b>Snacks:</b> {plan.snacks}</p>
                    <p><b>Calories:</b> {plan.calories_breakdown}</p>
                </div>
            )}

        </div>
    );
}

export default AIFood;