const config = require('../../../../config');
const express = require('express');

var userRoutes = express.Router();

userRoutes.post('/create', require('./create'))

userRoutes.post('/login', require('./login'))

userRoutes.get('/find', require('./find'))

userRoutes.post('/upload', require('./uploadFile'))

userRoutes.post('/postViewMusic', require('./songView'))

userRoutes.post('/postViewUser', require('./userView'))

userRoutes.post('/getHash', require('./getHash'))


userRoutes.get('/getHomeSongs', require('./getHomeSongs'))

userRoutes.get('/getHotUsers', require('./getHotUsers'))

userRoutes.get('/getRanking', require('./getRanking'))

module.exports = userRoutes;