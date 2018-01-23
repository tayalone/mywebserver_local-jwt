const User = require('../models/user')

exports.signup = (req, res, next) => {
    //res.send(req.body)
    const email = req.body.email
    const password = req.body.password
    if (!email || !password){
        return res.status(422).send("Your should give me a email and password")
    }
    User.findOne({email: email}, (err, user) => {
        if(err) {return res.status(422).send(err)}
        if(user) {
            return res.status(422).send("Existing User")
        }
        const newUser = new User({
            email: email,
            password: password
        })
        newUser.save((err) => {
            if(err) {return res.status(442).send(err)}
            res.status(200).send({success : true})
        })

    })
    
}