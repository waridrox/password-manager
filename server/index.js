const express = require('express')
const app = express()
const mysql = require('mysql')
const PORT = 3001
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root', 
    host: 'localhost',
    password: 'password',
    database: 'PasswordManager'
})

app.post("/addpass", (req, res) => {
    const { password, website } = req.body

    db.query("INSERT INTO passwords (password, website) VALUES (?,?)", [password, website], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Success!")
            console.log("Data sent")
        }
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})