
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000
const connectToMongo = require("./db");

connectToMongo() ;

//for accessing database from browser
app.use(cors()) ;

//for getting user data in json format
app.use(express.json());

app.use('/api/auth' , require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Login system is ready')
})

app.listen(port, () => {
  console.log(`Login System  listening on port ${port} `)
})