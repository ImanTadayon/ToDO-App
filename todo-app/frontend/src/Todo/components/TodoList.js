
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import CreateTaskPopup from '../modals/CreateTask'
import Card from './Card';
import "../Todo.css"
import 'bootstrap/dist/css/bootstrap.min.css'

import { saveTask } from '../../data/api/todo/create';
import { deleteTaskApi } from '../../data/api/todo/delete';
import { TodoListApi } from "../../data/api/todo/list";
import { updateTaskApi } from "../../data/api/todo/update";
import { searchTaskApi } from "../../data/api/todo/search";
import axios from "axios";





const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    const location = useLocation()

    // eslint-disable-next-line
    const { message, user } = location.state || {};

    const navigate = useNavigate();


    // دریافت نام کاربر از دیتابیس
    // ############################
    // const userName = () => {

    //     const { user } = location.state || {};
    //     const user_name = user.first_name;
    //     console.log(user_name);
    //     return user_name
    // }





    // نمایش دیتای کاربر برای اولین دفعه ورود 
    // ######################################
    // اضافه کردن توکن و جلوگیری از عدم احراز هویت بعد از ریفرش مرورگر
    // ###############################################################

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        let arr = localStorage.getItem("taskList")

        listTodo()
        if (arr) {
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])






    // ######################   Create CARD  #######################
    const createTask = async (taskObj) => {
        await saveTask(taskObj, (newTaskId) => {

            // اضافه کردن آی‌دی به کارت جدید
            const newTaskWithId = { ...taskObj, id: newTaskId };
            let tempList = [...taskList];
            tempList.push(newTaskWithId);
            // localStorage.setItem("taskList", JSON.stringify(tempList));
            setTaskList(tempList);
            setModal(false);
        });
    };








    // ######################   DELETE API & DELETE CARD  #######################
    const deleteTask = async (taskId, index) => {
        try {
            console.log('task ID : ', taskId);


            // ارسال درخواست به سرور برای حذف تسک از دیتابیس
            // ############################################
            const response = await deleteTaskApi(taskId);
            console.log('DELETE task response:', response.data);


            // حذف کارت از لیست کارت‌ها
            // ######################
            let updatedTaskList = [...taskList];
            updatedTaskList.splice(index, 1);
            setTaskList(updatedTaskList);

        } catch (error) {
            console.error(error);
        }
    }





    // ######################   UPDATE API & UPDATE CARD  #######################
    const updateListArray = async (tempObj, index) => {
        try {

            // ارسال درخواست به سرور برای ویرایش تسک از دیتابیس
            // ################################################
            const response = await updateTaskApi(tempObj.id, tempObj)
            console.log('Edit task response:', response.data);

            //  ویرایش کارت
            // #################
            const updatedTaskList = [...taskList];
            updatedTaskList[index] = { ...updatedTaskList[index], ...tempObj };
            setTaskList(updatedTaskList);
            setModal(false);
        } catch (error) {
            console.error(error);
        }
    };




    const toggle = () => {
        setModal(!modal);
    }




    // ارسال درخواست لیست
    // ######################   LIST API  #######################
    const listTodo = async () => {
        try {
            // const response = await TodoListApi();
            setTaskList(await TodoListApi());

        } catch (error) {
            console.error(error);
        }

    }



    // ######################   SEARCH    #######################
    const [searchValue, setSearchValue] = useState("")

    const searchInputChange = async (event) => {
        setSearchValue(event.target.value)
    }




    // ######################   SEARCH API   #######################
    const searchTodo = async () => {
        try {

            const tasks = await searchTaskApi(searchValue);
            setTaskList(tasks[0]);

        } catch (error) {
            console.error(error);
        }
    }


    // سرچ با زدن دکمه سرچ
    // ######################
    const searchButton = async () => {
        if (searchValue) {
            searchTodo()
            // setSearchValue("")
        }
        else {
            // alert("Input Search")
            listTodo()
        }
    }

    // سرچ با زدن دکمه اینتر
    // ######################
    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            await searchButton();
        }
    };





    return (
        <>
            <div className="header">
                <div className='top'>
                    <h3>Todo List</h3>
                    <button className="crTask mt-2" onClick={() => setModal(true)} >Create Task</button>
                    <div className="dropdown">
                        <button data-text="Awesome" className="button">
                            <span className="actual-text">&nbsp;{user.first_name}&nbsp;</span>
                            <span className="hover-text" aria-hidden="true">&nbsp;{user.first_name}&nbsp;</span>
                        </button>



                        {/* دکمه مربوط به انتقال کاربر از صفحه تودو به صفحه خانه  */}
                        {/* ##################################################### */}
                        <div class="dropdown-content">
                            <button className='personalInfo' onClick={() =>
                                navigate('/home', { state: { user } })
                            }> Personal Info </button>



                            {/* دکمه مربوط به خروج از برنامه  */}
                            {/* ############################# */}
                            <button className='logout' onClick={() => {
                                navigate('/login');
                                delete axios.defaults.headers.common['Authorization'];
                                localStorage.clear();
                                window.history.pushState(null, null, '/login')

                            }}>Log Out</button>
                        </div>

                    </div>
                </div>



                <div className='dokme'>
                    <div className="searchBox">
                        <input className="searchInput" type="text" placeholder="Search" value={searchValue} onChange={searchInputChange} onKeyDown={handleKeyPress} ></input>
                        <button className="searchButton" href="#" onClick={searchButton}>
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>
                </div>


                <div className="refreshBox">
                    <button className="refreshButton" href="#" onClick={listTodo}>
                        <span className="material-symbols-outlined">autorenew</span>
                    </button>
                </div>
            </div >


            <div className="task-container">
                {taskList && taskList.map((obj, index) => (
                    <Card key={index}
                        taskObj={obj}
                        index={index}
                        deleteTask={
                            (taskId) => deleteTask(taskId, index)
                        }
                        updateListArray={
                            (tempObj, onSuccess) => updateListArray(tempObj, index, onSuccess)
                        }
                    />
                ))}
            </div>


            {/* <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} /> */}
            <CreateTaskPopup toggle={toggle} modal={modal} save={createTask} />

        </>
    );
};



export default TodoList;
