const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs'); 
const env = require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/shop', require('./router/projects.js') );


	 	






	

