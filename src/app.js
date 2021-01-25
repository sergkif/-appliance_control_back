const express = require('express')
const indexRouter = require('./routers/indexRouter')
var cors = require('cors')
const port = process.env.PORT
require('./db/db')


const app = express()

app.use(cors())
app.use(express.json())
app.use(indexRouter)
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})