const bcrypt = require('bcrypt')

module.exports = {
    hash(text) {
        return bcrypt.hashSync(text, 10)
    },
    
    check(hash, password) {
        return bcrypt.compareSync(password, hash)
    }
}