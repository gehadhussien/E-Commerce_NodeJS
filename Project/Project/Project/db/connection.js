exports.openConnection = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'fue12345',
            database: 'e_commercee'
        }
    });

    return knex
}

