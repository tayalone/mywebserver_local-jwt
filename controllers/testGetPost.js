exports.getuser = (req, res ,next) => {
    res.json({
        email: "a@a.com",
        role: "user"
    })
}

exports.getuserId = (req, res, next) => {
    res.json(req.params)
}

exports.postuser = (req, res, next) => {
    res.json(req.body)
}

