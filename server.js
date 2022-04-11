const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views','app/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(express.static('app/public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));

app.get('/', (req, res, next) => {
    res.render('index');
})
app.get('/admin',(req, res, next) => {
    res.render('adminIndex');
})
app.get('/500', (req, res) => {
    res.render('err')
});
app.get('/404', (req, res) => {
    res.render('404')
});

require ('./app/routes/todo.route')(app);
require ('./app/routes/auth.route')(app);
require ('./app/routes/web.route')(app);
require ('./app/routes/admin.route')(app);
require ('./app/routes/product.route')(app);
require ('./app/routes/category.route')(app);
app.listen(3000, function(){
    console.log('Server running: http//localhost:3000');
});

