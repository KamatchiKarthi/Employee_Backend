const express = require('express');
const path = require('path');
const { createDBconnection } = require('./Config/dbconnection');
const adminRoutes = require('./Routes/adminroutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//create db connection
createDBconnection();

// API routes

app.use('/employee', adminRoutes);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, 'localhost', error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started at http://localhost:3000`);
  }
});
