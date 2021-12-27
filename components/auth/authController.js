const userService = require('./userService')

exports.login = (req, res) => {
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('auth/views/login', {
        wrongPassword,
        layout: false
    });
}

exports.renderRegister = (req, res) => {
    const emailExist = req.query['email-exist'] !== undefined;
    const passwordConfirmFailed = req.query['password-confirm-failed'] !== undefined;
    res.render('auth/views/register', {
        emailExist,
        passwordConfirmFailed,
        layout: false
    });
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

exports.register = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    const passwordConfirm = req.body['confirm-password'];
    if (password == passwordConfirm) {
        const checkExists = await userService.checkExists(email);
        if (checkExists.length != 0) {
            res.redirect('/register?email-exist')
            // const message = "Username already exists";
            // res.flash('username-exist', message);
        } else {
            const user = await userService.register(username, email, password);
            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect('/')
            })
        }
    } else {
        res.redirect('/register?password-confirm-failed')
    }

}