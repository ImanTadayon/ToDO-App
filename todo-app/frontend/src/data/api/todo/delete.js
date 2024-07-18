// deleteTask.js
import axios from "axios";
import { BASE_URL } from "../../config/BaseURL";

export const deleteTaskApi = async (taskId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${taskId}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
