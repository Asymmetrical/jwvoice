const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

//const comm = require('./views/commands');
// an idea would be to precalculate the commands before sending them as 
// parameters to the page when showing it.
// command.js should not need to be in public folder...

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// add some middleware
// setting up a static server - super simple!!! 
// Go from here to make simple sites

//middleware!!
// we call next to tell express that we are done
// logging feature below
var latestPageHistory = [];
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('Server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server log');
        }
    });
    next(); // finishes this middleware
});

// super good maintenance break on the site
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     next(); // finishes this middleware
// });
// so that public does not show due to maintenance

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});



// arguments: url path, method (what will happen)
// request with header from caller etc
app.get('/', (request, response) => {
    //response.send('<h1>Hello from Johan!!</h1>');
    // response.render('start.hbs', {
    //     pageTitle: 'Welcome to Johans site!',
    //     welcomeMessage: 'Welcome to my cool site'
    // });
    response.render('start.hbs');
    latestPageHistory.push('start');
});

app.get('/start', (req, res) => {
    res.render('start.hbs');
    latestPageHistory.push('start');
});
app.get('/home', (req, res) => {
    res.render('start.hbs');
    latestPageHistory.push('start');
});
app.get('/connect', (req, res) => {
    res.render('connect.hbs');
    latestPageHistory.push('connect');
});
app.get('/create', (req, res) => {
    res.render('create.hbs');
    latestPageHistory.push('create');
});
app.get('/edit', (req, res) => {
    res.render('edit.hbs');
    latestPageHistory.push('edit');
});
app.get('/overview', (req, res) => {
    res.render('overview.hbs');
    latestPageHistory.push('overview');
});
app.get('/search', (req, res) => {
    res.render('search.hbs');
    latestPageHistory.push('search');
});
// app.get('/back', (req, res) => {
//     if (latestPageHistory.length > 3){
//         var historyPage = latestPageHistory.length-2;
//         console.log(historyPage);
//         console.log(latestPageHistory);
//         res.render(latestPageHistory[historyPage] + '.hbs');
//     }
// });


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 404
    });
});

app.listen(port, () => {
    console.log(`Server is up and running at port ${port}`);
});