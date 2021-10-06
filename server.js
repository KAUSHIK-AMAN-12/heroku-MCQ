require('dotenv').config()
const express = require('express')
const app = express()
const Port = process.env.PORT || 4444                    //OR condition if Ist part not work thn second

app.use(express.static(__dirname + '/public'))

app.listen(Port , ()=>
{
    console.log(`http://localhost:${Port}`)
})