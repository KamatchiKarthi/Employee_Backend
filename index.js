const express = require('express');
const path = require('path');
const { createDBconnection } = require('./Config/dbconnection');
const adminRoutes = require('./Routes/adminroutes');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.DB_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const allowedOrigins = process.env.Front_end_URL || 3000;
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman or server-to-server
    const cleanOrigin = origin.replace(/\/$/, ''); // remove trailing slash
    if (allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 204,
};

//create db connection
createDBconnection();

// API routes

app.use('/employee', adminRoutes);

app.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Job portal API is running',
      time: new Date().toISOString(),
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Job API error',
    });
  }
});

app.listen(port, error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started at http://localhost:${port}`);
  }
});
