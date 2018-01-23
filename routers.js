module.exports = (app) => {
    
    app.get('/getuser', (req, res) => {
        res.json({
            email: "a@a.com",
            role: "user"
        })
    })
    app.get('/getuser/:id',(req, res) => {
        //console.log(req.params.id)
        res.json(req.params)
    })
    app.post('/postuser', (req, res) => {
        //console.log(req.body)
        res.json(req.body)
    })

}