const express = require('express');
const analyticsRouter = express.Router();

const { getCategorySummary, getMonthlySummary } = require('../controllers/analyticsController');

analyticsRouter.get('/category-summary', getCategorySummary);

analyticsRouter.get('/monthly-summary', getMonthlySummary);

module.exports = analyticsRouter;