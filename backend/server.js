const express = require('express')
const dotenv = require('dotenv')

const connectDb = require('./config/db')
const userRoute = require('./routes/userRoutes')
const chatRoute = require('./routes/chatRouter')
dotenv.config()
connectDb()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

 
app.use('/api/user', userRoute)
app.use('/api/chat', chatRoute)

const PORT = process.env.PORT || 5000


app.listen(PORT, console.log('server started on Port 5000'))