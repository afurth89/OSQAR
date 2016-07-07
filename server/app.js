const express = require("express")
const app = express();
const bodyParser = require('body-parser');
const db = require('./models')
const methodOverride = require('method-override')
const morgan = require('morgan')

app.use('/views', express.static(__dirname + '/../client/views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

app.get('*', (req, res) => {
  // This code is FORBIDDEN (Express thinks it could be malicious)
  // res.sendFile(__dirname + '/../client/views/layout.html')
  res.sendFile('layout.html', {root: './client/views'})
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is listening on port 3000");
});