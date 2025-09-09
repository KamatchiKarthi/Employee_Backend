const {
  createEmployee,
  getAllEmployee,
  getEmployeeId,
  searchEmployee,
  editEmployee,
  deleteEmployee
} = require('../Controller/admincontroller');
const express = require('express');

const adminRoutes = require('express').Router();

adminRoutes.post('/create', createEmployee);

adminRoutes.get('/all', getAllEmployee);

adminRoutes.get(`/empoly/:id`, getEmployeeId);

adminRoutes.get('/search' , searchEmployee)

adminRoutes.put('/update/:id' , editEmployee)

adminRoutes.delete('/delete/:id' , deleteEmployee)

module.exports = adminRoutes;
