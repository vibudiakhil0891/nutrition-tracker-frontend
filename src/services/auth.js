import axios from "axios";

const API_URL = "https://nutrition-tracker-backend-zpws.onrender.com/api";

export const registerUser = async (userData) => {
    return await axios.post(
        `${API_URL}/register/`,
        userData,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};

export const loginUser = async (userData) => {
    return await axios.post(
        `${API_URL}/login/`,
        userData,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};