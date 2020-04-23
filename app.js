const express = require('express');
const path = require('path');
const app = express();

const todos = require('./routes/todos');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use('/api', todos);


app.listen(3000)