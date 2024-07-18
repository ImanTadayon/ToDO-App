
import { useLocation, useNavigate } from "react-router-dom";

import '../CssFiles/Home.css'

import Particle from './particle';






function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const { message, user } = location.state || {};


    // هدایت مستقیم کاربر به صفحه /todolist
    // useEffect(() => {
    //     if (user) {
    //         navigate('/todolist', { state: { user: user } });
    //     }
    // }, [user, navigate]);


    // if (!user) {
    //     return null; // or display a loading state
    // }



    return (
        <div className='sectionLogin'>
            <div className="loginBack">
                <h1 className="loginH1">You have successfully logged into your account</h1>
                <p>{message}</p>
                <div>
                    <p>First name : <span>{user.first_name}</span></p>
                    <p>Last name : <span>{user.last_name}</span></p>
                    <p>User name : <span>{user.email}</span></p>
                    <p>Password :  <span>{user.password}</span></p>
                </div>


                {/* استفاده از تگ باتن به جای لینک و ارسال اطلاعات کاربر به صفحه تودولیست با کلیک روی دکمه */}
                <button
                    className='butn back'
                    onClick={() =>
                        navigate('/todolist', { state: { user } })
                    }
                >
                    TODO List {user.first_name} {user.last_name}
                </button>


                {/* <Link to="/todolist" className='butn back'>TODO List {user.first_name} {user.last_name}</Link> */}


            </div>
            <Particle className="particles" />
        </div>
    )
}

export default Home;
