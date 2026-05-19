const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

//load env variables

dotenv.config();


//Connect to database

connectDB();

//Initialize Express app
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Request logging middleware (for development)
if(process.env.NODE_ENV === 'development'){
    app.use((req,res,next) => {
        console.log(`${req.method}${req.path}`);
        next();
    });
}

//Routes
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/users',require('./routes/userRoutes'));

//Root route
app.get('/', (req,res) => {
    res.json({
        message: 'Welcome to Movie API',
        version: '1.0.0',
        endpoints:{
            movies:'/api/movies',
            users:'/api/users'
        }
    });
});


//Health check
app.get('/health',(req,res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

//Error handler
app.use(errorHandler);

//404 handler
app.use((req,res)=>{
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server is running${process.env.NODE_ENV}mode on port${PORT}`);
});

