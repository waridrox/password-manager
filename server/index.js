const express = require('express')
const app = express()
const PORT = 3001
const cors = require('cors')
require('dotenv').config()

const { db } = require('./config/db')
const {encrypt, decrypt} = require('./EncryptionHandler')

app.use(cors())
app.use(express.json())

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

app.get('/showpasswords', (req, res) => {
    db.query('SELECT * FROM passwords;', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.post('/decryptpassword', (req, res) => {
    res.send(decrypt(req.body))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})