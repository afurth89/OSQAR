const express = require("express")
const app = express();
const bodyParser = require('body-parser');
var db = require('./models')
const methodOverride = require('method-override')
const morgan = require('morgan')

const tests = require('./routes/tests');
const questions = require('./routes/questions');
const sessions = require('./routes/sessions');

// Configure express.static
app.use('/assets', express.static(__dirname + '/../client/assets'))
app.use('/javascripts', express.static(__dirname + '/../client/javascripts'))
app.use('/stylesheets', express.static(__dirname + '/../client/stylesheets'))
app.use('/views', express.static(__dirname + '/../client/views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

// The api prefix is just to distinguish that these are
// server-side routes that will be requesting and fetching 
// data
app.use('/api/tests', tests)
app.use('/api/questions', questions)
app.use('/api/sessions', sessions)

app.get('*', (req, res) => {
  // This code is FORBIDDEN (Express thinks it could be malicious)
  // res.sendFile(__dirname + '/../client/views/layout.html')
  res.sendFile('layout.html', {root: './client/views'})
})

// NEEDS TO BE FIXED
  // So you can reload on any route and not be directed back to Index
// app.get('*', (req, res) => {
//   res.redirect('/tests')
// })

var port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log('Server listening on port '+port+'...');
});

module.exports = app;