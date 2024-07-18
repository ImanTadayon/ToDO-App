
const Todo = require('../model/todoData');
const jwt = require('jsonwebtoken');
// const getUserId = require('../middlewares/userIdFromToken')



// #################    Create a new todo    #################
const createTodo = async (req, res) => {
    try {
        const { title, description, status, due_date } = req.body;

        console.log('Received task data:', req.body);
        // دریافت آی دی کاربر از توکن
        const user_id = req.user_id

        const newTodo = await Todo.add(
            title,
            description,
            status,
            due_date,
            user_id
        );
        console.log("newTodo :", newTodo[0].insertId);
        console.log({
            message: "TDDO successfully created.",
        });
        res.status(201).json({
            message: "TDDO successfully created.",
            newTodo: newTodo[0].insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        console.log({ error: 'CREATE, Internal Server Error' });

        // next(error)
    }
};




// #################    Edit an existing todo    #################
const editTodo = async (req, res) => {
    try {
        const { title, description, status, due_date } = req.body;
        const user_id = req.user_id;

        // دریافت آی دی تسک از طریق روت
        const id = req.params.id;
        console.log("Edit task by id: ", id);
        const updatedTodo = await Todo.edit(
            id,
            title,
            description,
            status,
            due_date,
            user_id
        );
        res.status(200).json(updatedTodo);
        console.log({ message: 'Todo EDIT successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        console.log({ error: 'EDIT, Internal Server Error' });

    }
};





// #################    Delete a todo    #################

const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;

        // دریافت آی دی تسک از طریق روت
        const user_id = req.user_id;
        console.log("Delet task by id: ", id);
        const deletedTodo = await Todo.remove(id, user_id);

        if (!deletedTodo) {
            console.log({ error: 'DELETE, Todo not found' });
            return res.status(404).json({ error: 'DELETE , Todo not found' });

        }

        res.status(200).json({ message: 'Todo deleted successfully' });
        console.log({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        console.log({ error: 'DELETE, Internal Server Error' });
    }
};




// #################    Get user's todos    #################

const getUserTodo = async (req, res) => {
    try {
        const user_id = req.user_id;
        console.log("User Id List : ", user_id);
        const userTodos = await Todo.list(user_id);
        if (!userTodos) {
            console.log({ error: 'LIST, Data not found' });
            res.status(404).json({ message: "Data not found!" });
        } else {
            res.json(userTodos).status(200);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        console.log({ error: 'LIST, Internal Server Error' });
    }
};





// #################    Search user's todos    #################

const getSearchTodo = async (req, res) => {
    try {
        const user_id = req.user_id;
        const searchValue = req.params.searchValue;
        console.log("User Id Search : ", user_id);
        console.log("Value for Search : ", searchValue);

        const userTodos = await Todo.search(user_id, searchValue);
        if (!userTodos) {
            console.log({ error: 'Search, Data not found' });
            res.status(404).json({ message: "Data not found!" });
        } else {
            res.json(userTodos).status(200);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        console.log({ error: 'Search, Internal Server Error' });
    }
};




module.exports = {
    createTodo,
    editTodo,
    deleteTodo,
    getUserTodo,
    getSearchTodo
};


