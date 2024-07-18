
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../CheckData/SignupCheck";
import '../CssFiles/Signup.css'
import axios from 'axios';

import Particle from './particle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { User_URL } from "../data/config/url";



function Signup() {
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        if (
            errors.first_name === "" &&
            errors.last_name === "" &&
            errors.email === "" &&
            errors.password === "" &&
            errors.confirm_password === ""
        ) {
            try {
                const response = await axios.post(`${User_URL}/signup`, values);
                console.log(response)
                navigate('/create');
            } catch (err) {
                console.log(err.request.status);

                if (err.request.status === 409) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        email: "A username has already been created with the entered email"
                    }));
                };
            }
        }
    };



    // نمایش و مخفی کردن پسوورد 
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    // ######  نمایش پسوورد به صورت چک باکس######
    // const showPass = () => {
    //     var char = document.querySelectorAll(".show-hide");
    //     char.forEach(input => {

    //         if (input.type === "text") {
    //             input.type = "password";
    //         } else {
    //             input.type = "text";
    //         }
    //     })
    // }


    return (

        <div className='container'>

            <div className='content'>

                <h2>Sign-Up</h2>

                <form action="" onSubmit={handleSubmit}>

                    <div className='userData'>
                        <label htmlFor="first_name"><strong>First name</strong></label>

                        <input
                            type="text"
                            placeholder='Enter First name'
                            name='first_name'
                            onChange={handleInput}
                            className='formControl'
                        />

                        {errors.first_name && <span className='text-danger'>{errors.first_name}</span>}

                    </div>

                    <div className='userData'>
                        <label htmlFor="last_name"><strong>Last name</strong></label>

                        <input
                            type="text"
                            placeholder='Enter Last name'
                            name='last_name'
                            onChange={handleInput}
                            className='formControl'
                        />

                        {errors.last_name && <span className='text-danger'>{errors.last_name}</span>}

                    </div>

                    <div className='userData'>
                        <label htmlFor="email"><strong>Email</strong></label>

                        <input
                            type="email"
                            placeholder='Enter Email'
                            name='email'
                            onChange={handleInput}
                            className='formControl'
                        />

                        {errors.email && <span className='text-danger'>{errors.email}</span>}

                    </div>


                    {/* 
                    <div className='userData'>
                        <label htmlFor="password"><strong>Password</strong></label>

                        <input
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            onChange={handleInput}
                            className='formControl'

                        ######  نمایش پسوورد به صورت چک باکس######
                        className='formControl show-hide'
                        />

                        
                        ######  نمایش پسوورد به صورت چک باکس######
                        <input type="checkbox" onChange={showPass} /> Show Password
                        <br />

                        {errors.password && <span className='text-danger'>{errors.password}</span>}

                    </div> */}




                    {/* <div className='userData'>
                        <label htmlFor="confirm_password"><strong>Re-enter the password</strong></label>

                        <input
                            type="password"
                            placeholder='Confirm password'
                            name='confirm_password'
                            onChange={handleInput}
                            className='formControl show-hide'
                        />

                        {errors.confirm_password && <span className='text-danger'>{errors.confirm_password}</span>}

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


                    <div className="password-input">

                        <label htmlFor="confirm_password"><strong>Re-enter the password</strong></label>
                        <div className="password-wrapper">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter Password'
                                name='confirm_password'
                                onChange={handleInput}
                                className='dataInput'
                            />

                            <i
                                type="button"
                                onClick={togglePasswordVisibility}
                                className='password-toggle'
                            />



                        </div>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}

                        <br />
                    </div>

                    <button type='submit' className='signupbtn submit'>Sign up</button>

                    <p>You agree to our terms and policies</p>

                </form>
                <Link to="/login" className='loginbtn default'>Login</Link>

            </div>
            <Particle className="particles" />
        </div>
    );
}

export default Signup;


