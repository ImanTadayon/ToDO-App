import axios from "axios";
import { BASE_URL } from "../../config/BaseURL";

// ######################   UPDATE API & UPDATE CARD  #######################

export const updateTaskApi = async (taskId, updatedTaskObj) => {
    try {
        const response = await axios.put(`${BASE_URL}/edit/${taskId}`, updatedTaskObj);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
