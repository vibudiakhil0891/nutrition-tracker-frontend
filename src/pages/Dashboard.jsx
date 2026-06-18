
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);

    // STATES
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");

    const [result, setResult] = useState(0);
    const [bmi, setBmi] = useState(0);
    const [bmiCategory, setBmiCategory] = useState("");

    const [macro, setMacro] = useState({});
    const [aiDiet, setAiDiet] = useState(null);

    const [goal, setGoal] = useState("maintain");
    const [veg, setVeg] = useState(false);

    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");
    const [currentWeight, setCurrentWeight] = useState("");
    const [weightHistory, setWeightHistory] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {

        if (!token) {
            navigate("/");
            return;
        }

        loadUser();

    }, [token]);
    const loadUser = async () => {

        try {

            const res = await axios.get(
                "https://nutrition-tracker-backend-zpws.onrender.com/api/profile/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(res.data);

        } catch (err) {

            console.log(err);

        }
    };


    useEffect(() => {
        loadWeightHistory();
    }, []);
    const saveWeight = async () => {
        try {
            await axios.post(
                "https://nutrition-tracker-backend-zpws.onrender.com/api/weight/save/",
                {
                    weight: currentWeight,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            loadWeightHistory();

        } catch (err) {
            console.log(err);
        }
    };

    const loadWeightHistory = async () => {
        try {
            const res = await axios.get(
                "https://nutrition-tracker-backend-zpws.onrender.com/api/weight/history/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWeightHistory(res.data);

        } catch (err) {
            console.log(err);
        }
    };
    // LOGOUT
    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    // API CALLS
    const calculateCalories = async () => {
        const res = await axios.post(
            "https://nutrition-tracker-backend-zpws.onrender.com/api/calculate/",
            { age, weight, height },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setResult(res.data.calories);
    };

    const calculateBMI = async () => {
        const res = await axios.post(
            "https://nutrition-tracker-backend-zpws.onrender.com/api/bmi/",
            { weight, height }
        );
        setBmi(res.data.bmi);
        setBmiCategory(res.data.category);
    };

    const calculateMacros = async () => {
        const res = await axios.post(
            "https://nutrition-tracker-backend-zpws.onrender.com/api/macros/",
            { weight, calories: result },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMacro(res.data);
    };

    const generateAIDiet = async () => {
        const res = await axios.post(
            "https://nutrition-tracker-backend-zpws.onrender.com/api/ai-diet/",
            { goal, weight, veg },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setAiDiet(res.data);
    };

    const sendMessage = async () => {
        if (!message) return;

        const userMsg = { role: "user", text: message };
        setChat((prev) => [...prev, userMsg]);

        const res = await axios.post(
            "https://nutrition-tracker-backend-zpws.onrender.com/api/chat/",
            { message, weight, goal }
        );

        const aiMsg = { role: "ai", text: res.data.reply };
        setChat((prev) => [...prev, aiMsg]);

        setMessage("");
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">


            {/* SIDEBAR */}
            <div className="
w-72
bg-white/5
backdrop-blur-xl
border-r border-white/10
p-6
sticky top-0
h-screen
">
                <div className="space-y-3 mt-8">
                    <h1 className="text-xl font-bold mb-8">🥗 FitAI</h1>

                    <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
                        📊 Dashboard
                    </div>

                    <div className="p-3 rounded-xl hover:bg-white/10 cursor-pointer transition">
                        🍎 Food Search
                    </div>

                    <div className="p-3 rounded-xl hover:bg-white/10 cursor-pointer transition">
                        📝 Food Tracker
                    </div>

                    <div className="p-3 rounded-xl hover:bg-white/10 cursor-pointer transition">
                        🤖 AI Coach
                    </div>

                    <div className="p-3 rounded-xl hover:bg-white/10 cursor-pointer transition">
                        👤 Profile
                    </div>

                </div>

            </div>

            {/* MAIN */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">

                {/* TOP HEADER (LOGOUT RIGHT SIDE) */}
                <div className="flex justify-between items-center mb-6">
                    <div className="
bg-gradient-to-r
from-green-500
to-emerald-600
rounded-3xl
p-8
shadow-2xl
mb-8
">
                        <div>

                            <h1 className="text-3xl font-bold">
                                Welcome Back, {user.username} 👋
                            </h1>

                            <p className="text-gray-400">
                                Track your nutrition goals today
                            </p>

                        </div>
                        {/* 
                        <h1 className="text-5xl font-bold">
                            Welcome Back 👋
                        </h1> */}

                        <p className="mt-3 text-green-100 text-lg">
                            Track calories, macros and reach your fitness goals.
                        </p>

                    </div>

                    <h1 className="text-xl font-bold">
                        Dashboard
                    </h1>

                    <button
                        onClick={logout}
                        className="bg-red-500/20 hover:bg-red-500/40 px-4 py-2 rounded text-red-300"
                    >
                        Logout
                    </button>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* INPUT */}
                    <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                        <h2 className="mb-4 text-lg font-semibold">Body Input</h2>

                        <input className="w-full p-3 mb-3 bg-black/30 rounded" placeholder="Age"
                            onChange={(e) => setAge(e.target.value)} />

                        <input className="w-full p-3 mb-3 bg-black/30 rounded" placeholder="Weight"
                            onChange={(e) => setWeight(e.target.value)} />

                        <input className="w-full p-3 mb-3 bg-black/30 rounded" placeholder="Height"
                            onChange={(e) => setHeight(e.target.value)} />

                        <button onClick={calculateCalories} className="w-full bg-blue-500 p-2 rounded mb-2">
                            Calories
                        </button>

                        <button onClick={calculateBMI} className="w-full bg-green-500 p-2 rounded mb-2">
                            BMI
                        </button>

                        <button onClick={calculateMacros} className="w-full bg-purple-500 p-2 rounded">
                            Macros
                        </button>
                    </div>

                    {/* STATS */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">

                        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                            <p className="text-gray-400">Calories</p>
                            <h2 className="text-3xl font-bold">{result}</h2>
                        </div>

                        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                            <p className="text-gray-400">BMI</p>
                            <h2 className="text-3xl font-bold">{bmi}</h2>
                            <p className="text-sm text-gray-400">{bmiCategory}</p>
                        </div>

                        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                            <p className="text-gray-400">Protein</p>
                            <h2 className="text-2xl font-bold">{macro.protein || 0}g</h2>
                        </div>

                        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                            <p className="text-gray-400">Carbs</p>
                            <h2 className="text-2xl font-bold">{macro.carbs || 0}g</h2>
                        </div>

                        <div className="bg-white/5 p-5 rounded-xl lg:col-span-3 border border-white/10">
                            <p className="text-gray-400">Fat</p>
                            <h2 className="text-2xl font-bold">{macro.fat || 0}g</h2>
                        </div>

                    </div>

                    {/* AI DIET */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h2 className="text-xl mb-4">AI Diet Generator</h2>

                        <select
                            className="w-full p-3 mb-3 bg-black/30 rounded"
                            onChange={(e) => setGoal(e.target.value)}
                        >
                            <option value="maintain">Maintain</option>
                            <option value="lose">Lose</option>
                            <option value="gain">Gain</option>
                        </select>

                        <label className="flex gap-2 mb-3">
                            <input type="checkbox" onChange={(e) => setVeg(e.target.checked)} />
                            Vegetarian
                        </label>

                        <button
                            onClick={generateAIDiet}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded"
                        >
                            Generate AI Diet
                        </button>

                        {aiDiet && (
                            <div className="mt-4 bg-black/30 p-4 rounded">
                                <p>Goal: {aiDiet.goal}</p>
                                <p>Calories: {aiDiet.calories}</p>
                                <p>Protein: {aiDiet.protein}</p>
                                <p>Carbs: {aiDiet.carbs}</p>
                                <p>Fat: {aiDiet.fat}</p>
                            </div>
                        )}
                    </div>

                    {/* CHAT */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h2 className="text-xl mb-4">AI Chatbot</h2>

                        <div className="h-72 overflow-y-auto bg-black/30 p-4 rounded mb-4">
                            {chat.map((c, i) => (
                                <div key={i} className={`mb-2 ${c.role === "user" ? "text-right" : "text-left"}`}>
                                    <span className={`inline-block px-3 py-2 rounded ${c.role === "user" ? "bg-blue-500" : "bg-green-500"}`}>
                                        {c.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                className="flex-1 p-3 bg-black/30 rounded"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask something..."
                            />

                            <button onClick={sendMessage} className="bg-purple-500 px-6 rounded">
                                Send
                            </button>



                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;