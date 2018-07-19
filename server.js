const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
// define view engine
app.set('view engine', 'hbs');
// define uses of partials
hbs.registerPartials(__dirname + '/views/partials');

// Export log activities to the server.log
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});
// maintenance noftification
app.use((req, res, next)=>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

//
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});
app.get('/', (req, res)=>{
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    welcomeMessage: 'Hello!',
    pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});
app.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});
