
const Database = require('../core/database/database.js');



//#####   Create todo API  ######
//###############################
const add = async (title, description, status, due_date, user_id) => {
    try {
        console.log("USER ID :", user_id);
        const query = `
        INSERT INTO UserDatabase.todo (title, description, status, due_date, user_id) VALUES (?, ?, ?, ?, ?);
        `;

        const params = [title, description, status, due_date, user_id];
        const result = await Database.query(query, params);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};




//#####   Edit todo API   ######
//##############################
const edit = async (id, title, description, status, due_date, user_id) => {
    try {
        console.log("EDIT TODO ID : ", id);
        console.log("USER ID :", user_id);
        const updateTodo = {
            title,
            description,
            status,
            due_date,
            user_id
        };
        const params = [];
        const updateStatements = [];

        for (const [key, value] of Object.entries(updateTodo)) {
            if (value !== undefined) {
                updateStatements.push(`${"`" + key + "`"} = ?`);
                params.push(value);
            } else {
                params.push(null);
            }
        }
        params.push(id);
        params.push(user_id);

        const query = `
        UPDATE UserDatabase.todo SET ${updateStatements.join(',')} WHERE id = ? AND user_id = ? ;
        `;

        const [result] = await Database.query(query, params);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



//#####   Delete todo API  ######
//###############################
const remove = async (id, user_id) => {
    try {
        console.log("DELETE TODO ID : ", id);
        console.log("USER ID :", user_id);
        const params = [];
        params.push(id);
        params.push(user_id);

        const query = `
        DELETE FROM UserDatabase.todo WHERE id = ? AND user_id = ? ;
        `;
        const [result] = await Database.query(query, params);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};







//#####   List todos API   ######
//###############################
const list = async (user_id) => {
    try {
        console.log("List Data by USER ID :", user_id);
        const query = `
        SELECT * FROM UserDatabase.todo WHERE user_id = ?;
        `;
        const params = [user_id];
        const result = await Database.query(query, params);
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
    ;
}



//#####   Search todos API   ######
//###############################
const search = async (user_id, searchValue) => {
    try {
        console.log("search Data by USER ID :", user_id, "  ----  ", searchValue);
        const query = `
        SELECT * FROM UserDatabase.todo WHERE user_id = ? AND (title LIKE ? OR description LIKE ? OR status LIKE ?);
        `;
        const params = [user_id, `%${searchValue}%`, `%${searchValue}%`, `%${searchValue}%`];
        console.log("params :   ", params);
        const result = await Database.query(query, params);
        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
    ;
}





module.exports = {
    add,
    edit,
    remove,
    list,
    search
};






