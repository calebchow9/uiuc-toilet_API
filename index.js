let express = require('express')
let app = express()

let bathroomRoute = require('./routes/bathrooms')

let path = require('path')
app.use((req, res, next) =>{
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})

app.use(bathroomRoute)
app.use(express.static('public'))

// Error 404
app.use((req, res, next) =>{
    res.status(404).send('Error 404: Not Found')
})

//Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))