const express = require("express")
const app = express();
const bodyParser = require('body-parser');
var db = require('./models')
const methodOverride = require('method-override')
const morgan = require('morgan')

const teachers = require('./routes/teachers');

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
app.use('/api/teachers', teachers)

app.get('/teachers', (req, res) => {
  // This code is FORBIDDEN (Express thinks it could be malicious)
  // res.sendFile(__dirname + '/../client/views/layout.html')
  res.sendFile('layout.html', {root: './client/views'})
})

app.get('*', (req, res) => {
  res.redirect('/teachers')
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is listening on port 3000");
});