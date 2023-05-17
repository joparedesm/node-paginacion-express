const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/node-paginacion-express', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB is connected'))
.catch(err => console.log(err));

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
const indexRoutes = require('./routes/index');
app.use(indexRoutes);

// static files


app.listen(app.get('port'), () => {
    console.log('Server is running on port ', app.get('port'));
});