class CUSTOMER {
    constructor(id,  name, email,address , phone , country , password, hashedPassword) {
        this.id = id
        this.name = name
        this.email = email
        this.address = address
        this.phone = phone
        this.country = country
        this.password = password
        this.hashedPassword = hashedPassword
    }
}

module.exports = CUSTOMER