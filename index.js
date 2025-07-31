const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
app.use('/static', express.static('img'));
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());


const todoRoute = require('./routes/todoRoute');
app.use('/api/todo', todoRoute);

app.use('/api/notepad', require('./routes/notepadRoute'))

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
})


//ALL ROUTES
app.get('/', (req, res) => {
    res.render('index')
})



app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, () => {
    console.log('Working fine!!');
})