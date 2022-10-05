const express = require('express')
const app = express()
const port = 3000 
const indexroutes = require('./routes/index')

const connect = require('./schemas/index')
connect();



app.use(express.json());
app.use('/',indexroutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})