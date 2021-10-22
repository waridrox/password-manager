const express = require('express')
const app = express()
const mysql = require('mysql')
const PORT = 3001
const cors = require('cors')
require('dotenv').config()

const {encrypt, decrypt} = require('./EncryptionHandler')

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

    //Encrypting before sending the passswords
    const encryptedPass = encrypt(password)

    db.query("INSERT INTO passwords (password, website, iv) VALUES (?,?,?)", [encryptedPass.encPass, website, encryptedPass.iv], (err, result) => {
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