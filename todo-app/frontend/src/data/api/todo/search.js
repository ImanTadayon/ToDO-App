
import { BASE_URL } from "../../config/BaseURL";
import axios from "axios";



// ######################   SEARCH API   #######################
export const searchTaskApi = async (searchValue) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/${searchValue}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
