import axios from "axios";
import { BASE_URL } from "../../config/BaseURL";


// ######################   LIST API   #######################
export const TodoListApi = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/list`);
        return response.data[0];
    } catch (error) {
        throw error;
    }
};