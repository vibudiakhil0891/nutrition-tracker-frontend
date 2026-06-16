import { useEffect, useState } from "react";
import axios from "axios";

function AIHistory() {

    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        const token = localStorage.getItem("access_token");

        const res = await axios.get(
            "http://127.0.0.1:8000/api/ai/history/",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setHistory(res.data);
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

            <h1 className="text-2xl font-bold mb-6">
                🧠 AI Diet History
            </h1>

            <div className="space-y-4">

                {history.map((item) => (
                    <div key={item.id} className="bg-white/5 p-4 rounded">

                        <p><b>Goal:</b> {item.goal}</p>
                        <p><b>Calories:</b> {item.calories}</p>
                        <p><b>Vegetarian:</b> {item.veg ? "Yes" : "No"}</p>

                        <pre className="mt-2 text-sm bg-black/30 p-2 rounded">
                            {item.plan}
                        </pre>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default AIHistory;