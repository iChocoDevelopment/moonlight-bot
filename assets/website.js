const app = require('express')()
app.get('/', (req,res) => {
    res.send('Under development')
})
app.listen(8080)