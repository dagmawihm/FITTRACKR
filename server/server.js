if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const ExpressError =  require('./utils/ExpressError')
const user = require('./route/user');
const exercises = require('./route/exercises');

const app = express();

connectDB(process.env.MONGO_URI);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json());
app.use(cookieParser());


app.use('/user', user)
app.use('/exercise', exercises)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Founda', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "something went wrong" } = err;
    console.log(message, statusCode);
    res.status(statusCode).json({ message })
})

app.listen(5000, () => {
    console.log('Serving on port 5000');
})