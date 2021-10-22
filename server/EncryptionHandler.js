const crypto = require('crypto')

const secret = process.env.secret
const encrypt = (password) => {
    //initialisation vector 
    const iv = Buffer.from(crypto.randomBytes(16))

    //encryption algo | transform secret into a buffer | pass the vector
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv)

    const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()])

    //we also require the iv to decrypt so passing it as an object
    return { 
    iv: iv.toString('hex'), 
    encPass: encryptedPassword.toString('hex')
}
}

const decrypt = (encryption) => {
    const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(secret), Buffer.from(encryption.iv, 'hex'))

    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.encPass, 'hex')), 
        decipher.final()
    ])

    return decryptedPassword.toString()

}

module.exports = { encrypt, decrypt };