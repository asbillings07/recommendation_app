const User = require('../../models');
dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const express = require('express');
const router = express.Router();

module.exports = router;