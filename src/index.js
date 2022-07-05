// Already covered in part 1
const express = require('express')
const app = express()

/*
    Here we are just importing the router we've created at the
    file controller/wishes.js. See that file for more details.
*/
const wishesRouter = require('./controller/wishes')

// Already covered in part 1
const port = 3000

/*
    This statement makes express understand and parse JSON data
    sent by the API consumers. That data will be used to create
    and update our registers.
*/
app.use(express.json())

/*
    Here we are just attaching the router we've created at the
    file controller/wishes.js. See that file for more details.
*/
app.use(wishesRouter)

// Already covered in part 1
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Already covered in part 1
app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})