const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const isInMaintainanceMode = false;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

app.use((req, res, next) => {
  if(isInMaintainanceMode){
    res.render('maintainance.hbs', {
      currentYear: new Date().getFullYear(),
      pageTitle: 'Sorry!!',
    });
  }else{
    next();
  }
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
    //response.send('<h1>Hello Express!!</h1>');
    response.render('home.hbs', {
      currentYear: new Date().getFullYear(),
      pageTitle: 'Home Page!!',
      welcomeMessage: 'Hi, Welcome to my firt Express Site!! :)'
    });
    // response.send({
    //   name: 'Lakmal',
    //   likes: [
    //     'sleeping',
    //     'coding',
    //     'being awesome!!'
    //   ]
    // });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    currentYear: new Date().getFullYear(),
    pageTitle: 'About us Page!!'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
