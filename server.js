const express = require('express');
const path = require('path');
const app = express();
const env = require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'./database')));


app.use('/projects', require('./router/projects.js') );
app.use('/projects', require('./router/task.js') );


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


	 	






	

