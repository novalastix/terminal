const express = require('express');
const path = require('path');
const defaultRoute = require('./routes/default')
const app = express();
const port = 8080;

//Use EJS templating engine for variables inside HTML
app.set('view engine','ejs');

//Set path for static content to /public
app.use(express.static(path.join(__dirname,'public')));

app.use('/',defaultRoute);

app.listen(port, () => 
    {
    console.log(`Server running at localhost:${port}`);
});
