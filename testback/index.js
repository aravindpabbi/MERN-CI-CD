const express = require("express");

const app = express();

// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

const port = 3000

app.get("/", (req, res) => {
    return res.send("Hello World")
})

const admin = (req, res) => {
    res.send("this is admin")
}

const isloggedIn = (req, res,next) => {
    console.log("fiest middleware");
    next()
}

const isAdmin = (req, res,next) => {
    console.log("second middleware");
    next()
}

app.get("/admin", isloggedIn,isAdmin, admin)
app.listen(port, () => {
    console.log("server is up and running");
})