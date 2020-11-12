const User = require('../models/User');

///HANDLE ERRORS/////
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: ''};


    ///DUPLICATE ERROR CODE///
    if (err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }


    ///VALIDATION ERRORS///
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message; 
        })
    }
    return errors;
}


///////// SIGNUP_GET /////////
module.exports.signup_get = (req,res) => {
    res.render('signup')
}

///////// LOGIN_GET /////////
module.exports.login_get = (req,res) => {
    res.render('login')
}

///////// SIGNUP_POST /////////
module.exports.signup_post = async (req,res) => {
    const {email, password} = req.body;

    try{
        const user = await User.create({email, password})
        res.status(201).json(user)
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

///////// LOGIN_POST /////////
module.exports.login_post = async (req,res) => {
    const {email, password} = req.body;

    console.log(email,password)
    res.send(`loging in user: ${email}`)
}