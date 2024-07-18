

import '../CssFiles/ChangePass.css'
import { Link } from "react-router-dom";


const handleBackClick = () => {

    window.location.href = '/login';
};


function ChangePass() {

    return (

        <div className='sectionReset'>
            <div className='asli'>
                <h2 className='htext'><strong>Reset password</strong></h2>
                <h4>Trouble logging in?</h4>
                <p className='prograf'>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>

                <br />
                <br />

                <form action="" >
                    <div className='bodyinput'>
                        <input
                            type="text"
                            placeholder='Email,Phone, or Username'
                            name='text'
                            className='userDataInput'
                        />
                    </div>

                    <br />
                    <br />
                    <br />

                    <button type='submit' className='send sendbtn'>Send login link</button>

                    <br />
                    <br />

                    <p className="prograf" ><Link to="/login" className="pushBtn"><span className="pushBtn">Can't reset your password?</span></Link></p>
                </form>

                <div className='liner'>
                    <div className="line"></div>
                    <p>OR</p>
                    <div className="line"></div>
                </div>

                <p className='prograf' ><Link to="/signup" className="pushBtn"><span className="pushBtn">Create new account</span></Link></p>
                <button onClick={handleBackClick} className='return returnbtn'>BACK</button>

            </div>
        </div>

    );
}




export default ChangePass;
