const express = require("express")
const app = express();
const bodyParser = require('body-parser');
var db = require('./models')
const methodOverride = require('method-override')
const morgan = require('morgan')

const tests = require('./routes/tests');

// Configure express.static
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

app.get('/tests', (req, res) => {
  // This code is FORBIDDEN (Express thinks it could be malicious)
  // res.sendFile(__dirname + '/../client/views/layout.html')
  res.sendFile('layout.html', {root: './client/views'})
})

// NEEDS TO BE FIXED
  // So you can reload on any route and not be directed back to Index
app.get('*', (req, res) => {
  res.redirect('/tests')
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is listening on port 3000");
});