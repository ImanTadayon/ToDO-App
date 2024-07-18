
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validlogin from "../CheckData/LoginCheck";
import '../CssFiles/Login.css'
import axios from 'axios';
import Particle from './particle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { User_URL } from "../data/config/url";


function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };



    const addTokenToRequest = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validlogin(values));

        if (
            errors.email === "" &&
            errors.password === ""
        ) {
            try {
                const loginResponse = await axios.post(`${User_URL}/token`, values);

                if (loginResponse.status === 201) {

                    const token = loginResponse.data.userToken;

                    addTokenToRequest(token); // اضافه کردن توکن به هدر

                    localStorage.setItem("token", token) // اضافه کردن توکن به لوکال استوریج


                    const tokenResponse = await axios.post(`${User_URL}/login`, values);


                    setTokenExpiration() // فقط جهت تست عملکرد انقضای زمان توکن میباشد


                    // navigate('/home', { state: { message: tokenResponse.data.message, user: tokenResponse.data.user } });
                    navigate('/todolist', { state: { message: tokenResponse.data.message, user: tokenResponse.data.user } });
                }

            } catch (error) {

                if (error.response.status === 401 || error.response.status === 403) {
                    // console.log(error.response.status);
                    setErrors(prevErrors => ({

                        ...prevErrors,
                        error: "Incorrect email or password"
                    }));

                } else {
                    console.log(error);
                }
            }
        }
    };



    const setTokenExpiration = () => {
        setTimeout(() => {
            if (window.location.pathname === '/home' || window.location.pathname === '/todolist') {
                delete axios.defaults.headers.common['Authorization'];
                // alert('اعتبار ورود به پایان رسید')
                navigate('/login');
                localStorage.clear()
                window.history.pushState(null, null, '/login')
            }
        }, 1800000); // میلی‌ثانیه معادل یک ساعت است
    };


    // نمایش و مخفی کردن پسوورد 
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    // ######  نمایش پسوورد به صورت چک باکس######
    // const showPass = () => {
    //     var char = document.querySelector(".show-hide");
    //     if (char.type === "text") {
    //         char.type = "password";
    //     } else {
    //         char.type = "text";
    //     }
    // }


    return (
        <div className='sectionLogin'>

            <div className='main'>

                <h2>Login</h2>

                <form action="" onSubmit={handleSubmit}>

                    <div className='bodyData'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            name='email'
                            onChange={handleInput}
                            className='dataInput'
                        />

                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    {/* <br /> */}


                    {/* <div className='userData'>
                        <label htmlFor="password"><strong>Password</strong></label>

                        <input
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            onChange={handleInput}
                            className='dataInput'

                        ###### نمایش پسوورد به صورت چک باکس######
                            className='dataInput show-hide'
                        />

                        ######  نمایش پسوورد به صورت چک باکس######
                        <input type="checkbox" onChange={showPass} /> Show Password
                        <br />
                    </div> */}


                    <div className="password-input">

                        <label htmlFor="password"><strong>Password</strong></label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter Password'
                                name='password'
                                onChange={handleInput}
                                className='dataInput'
                            />

                            <i
                                type="button"
                                onClick={togglePasswordVisibility}
                                className='password-toggle'
                            >
                                {/* {showPassword ? (<FontAwesomeIcon icon={faEyeSlash}/>) : (<FontAwesomeIcon icon={faEye} />)} */}
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </i>


                        </div>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}

                        <br />
                    </div>



                    <br />
                    <button type='submit' className='login loginbtn'>Login</button>

                    <p><a href="/resetpass" className="click"><b className="click">Click</b> </a>to recover password</p>

                    {errors.error && <h2><span className='text-danger'>{errors.error}</span></h2>}

                </form>

                <Link to="/signup" className='signup signupbtn'>Sign up</Link>

            </div>
            <Particle className="particles" />
        </div>
    );
}

export default Login;
