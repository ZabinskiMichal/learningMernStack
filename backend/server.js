require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require("./routes/workouts")
const userRoutes = require('./routes/user')

const app = express()

//implementacje middleweara
//middleware wykona sie jeszcze przed wbiciem do danego endpointa
app.use(express.json()) //jezeli jakis request jest przesłany z jsonem, jest on wtedy dolaczany do obiektu request w middleware

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//listen for requests
//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
 
//db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //nasłuchujemy requestow tylko w przypadku poprawnego polaczenia z baza 
        app.listen(process.env.PORT, () => {
            console.log("connexted to db % listenin on port", process.env.PORT)
        })

    })
    .catch((error) => {
        console.log(error)
    })






