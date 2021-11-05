const crypto = require('crypto')
const ALGORITHM = 'aes-256-ctr'
const secret = process.env.secret
const encrypt = (password) => {
    //initialisation vector 
    const iv = Buffer.from(crypto.randomBytes(16))

    //encryption algo | transform secret into a buffer | pass the vector
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(secret), iv)

    const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()])

    //we also require the iv to decrypt so passing it as an object
    return { 
    iv: iv.toString('hex'), 
    encPass: encryptedPassword.toString('hex')
}
}

const decrypt = (encryption) => {
    console.log("Enc object ", encryption)
    console.log("From the decrypt function", encryption)
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(secret), Buffer.from(encryption.iv, 'hex'))

    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.password, 'hex')), 
        decipher.final()
    ])

    return decryptedPassword.toString()

}

module.exports = { encrypt, decrypt };