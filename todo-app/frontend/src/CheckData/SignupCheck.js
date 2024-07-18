


function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/


    if (values.first_name === "") {
        error.first_name = 'First name should not be empty'

    } else if (values.first_name.length < 3) {
        error.first_name = 'First name length must be at least 3 characters long'

    } else {
        error.first_name = ""
    }


    if (values.last_name === "") {
        error.last_name = 'Last name should not be empty'

    } else if (values.last_name.length < 3) {
        error.last_name = 'Last name length must be at least 3 characters long'

    } else {
        error.last_name = ""
    }


    if (values.email === "") {
        error.email = 'Email should not be empty'

    } else if (!email_pattern.test(values.email)) {
        error.email = "Email didn't match"

    } else {
        error.email = ""
    }



    if (values.password === "") {
        error.password = 'Password should not be empty'

    } else if (!password_pattern.test(values.password)) {
        error.password = "Password didn't match"

    } else {
        error.password = ""
    }
    if (values.confirm_password === "") {
        error.confirm_password = 'Password should not be empty'

    } else if (values.confirm_password !== values.password) {
        error.confirm_password = "Password didn't match"

    } else {
        error.confirm_password = ""
    }
    return error;
}

export default Validation



