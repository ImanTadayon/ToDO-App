import React from "react";
import { Link } from "react-router-dom";

import '../CssFiles/Create.css'

import Particle from './particle';


function Create() {
    return (
        <div className='sectionLogin'>
            <div className="contain">
                <div className="conten">
                    <h2 className="h2">Congratulations, you have successfully registered</h2>

                </div>
                <Link to="/Signup" className='butn back'>Back</Link>
            </div>
            <Particle className="particles" />
        </div>

    )
}


export default Create