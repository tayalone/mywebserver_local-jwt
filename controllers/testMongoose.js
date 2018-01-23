const User = require('../models/user')

exports.testCreateUser = (req, res, next) => {
    //console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    if (!email || !password){
        res.status(422).send('plese give email and password')
    }
    User.findOne({email: email}, (err, user) => {
        if (err) { return res.status(409).send(err) }
        if (user) { return res.status(422).send('existing email') }
        
        const newuser = new User ({
            email: email,
            password: password
        })
        newuser.save( (err) => {
            if (err) { return res.status(409).send(err) }
            res.status(200).send({success : true})
        })
    })
    
}