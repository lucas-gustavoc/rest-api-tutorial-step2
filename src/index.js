// These two lines prepare express to be used by our API
const express = require('express')
const app = express()

// This line defines the port we're going to use to listen for requests. 3000 is a starting standard
const port = 3000

/* 
    With these three lines, we say to express that we want to expect a GET request
    to our root path (represented by '/') from our API consumers, which will be res-
    ponded with the string 'Hello World!'.
*/
app.get('/', (req, res) => {
    res.send('Hello World!')
})

/*
    Here we start our API server, using only two parameters: the port used to recei-
    ve the requests and a callback function to be started once the server is running.
    From now on, consumers can make a request using our root path and receive the ans-
    wer we planned above. In our case, we're runnig the server on localhost, so the ro-
    ot path would be http://localhost:3000/
*/
app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})