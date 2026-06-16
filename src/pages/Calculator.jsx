import { useState } from "react";
import axios from "axios";

function Calculator() {
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [result, setResult] = useState("");

    const calculate = async () => {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/calculate/",
            {
                age,
                weight,
                height,
            }
        );

        setResult(response.data.maintenance_calories);
    };

    return (
        <div>
            <h1>Calories Calculator</h1>

            <input
                type="number"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
            />

            <input
                type="number"
                placeholder="Weight"
                onChange={(e) => setWeight(e.target.value)}
            />

            <input
                type="number"
                placeholder="Height"
                onChange={(e) => setHeight(e.target.value)}
            />

            <button onClick={calculate}>
                Calculate
            </button>

            <h2>Maintenance Calories: {result}</h2>
        </div>
    );
}

export default Calculator;