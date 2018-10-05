const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var ipAddress = req.ip;
  var log = `${now}(ip: ${ipAddress}): ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Server is in maintenance.',
//     pageMessage: 'Servers are offline.'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Sayfama hoş geldiniz'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page 3'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'An unhandled exception occured. Please contact your System Administrator about this issue. (Issue Code: 364)'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});