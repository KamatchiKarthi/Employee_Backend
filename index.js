const express = require('express');
const path = require('path');
const { createDBconnection } = require('./Config/dbconnection');
const adminRoutes = require('./Routes/adminroutes');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const allowedOrigins = process.env.PORT;
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
  res.send('Hello world');
});

app.listen(port, error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started at http://localhost:${port}`);
  }
});
