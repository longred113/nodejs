const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
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

app.get('/', (req, res, next) => {
    res.render('index');
})
app.get('/500', (req, res) => {
    res.render('err')
});
app.get('/404', (req, res) => {
    res.render('404')
});

require ('./app/routes/todo.route')(app);

app.listen(3000, function(){
    console.log('Server running: http//localhost:3000');
});

