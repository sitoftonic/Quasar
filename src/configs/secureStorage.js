const CryptoJS = require("crypto-js")
const config = require('./config')
const SecureStorage = require('secure-web-storage')


const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, config.secureHash)
    return key.toString()
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, config.secureHash)
    return data.toString()
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, config.secureHash)
    return data.toString(CryptoJS.enc.Utf8)
  }
})

export default secureStorage
