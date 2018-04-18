const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// Intialize express and Set Port Number
const app = express();
const port = process.env.PORT || 5000;

// Load Routes
const users = require('./routes/users');
const strategies = require('./routes/strategies');
const child = require('./routes/children');

// Passport Config
require('./config/passport')(passport);
// Database Config
const db = require('./config/database');

// Connect to mongoose
mongoose.connect(db.mongoURI)
.then(() =>  console.log('Connected to MongoDB'))
.catch(err => console.log(err));


// Handleabars Middleware
app.engine('handlebars', exphbs({ 
    defaultLayout: 'main' 
}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false} ));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret:'secretphrase',
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global Variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});

// Use Routes
app.use('/strategy', strategies);
app.use('/users', users);
app.use('/child', child);


app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
});