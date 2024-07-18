
import axios from "axios";
import { BASE_URL } from "../../config/BaseURL";

export const saveTask = async (taskObj, onSuccess) => {
    try {
        const response = await axios.post(`${BASE_URL}/create`, {
            title: taskObj.title,
            description: taskObj.description,
            status: taskObj.status,
            due_date: taskObj.due_date
        });

        const newTaskId = response.data.newTodo; // گرفتن آی‌دی کارت ایجاد شده

        // console.log('Create task response:', response.data);
        // console.log('New task ID:', newTaskId);

        onSuccess(newTaskId); // ارسال آی‌دی کارت به callback
    } catch (error) {
        console.error(error);
    }
};