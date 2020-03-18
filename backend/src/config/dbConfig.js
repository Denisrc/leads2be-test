module.exports = {
    development: {
        USER: 'postgres',
        HOST: 'localhost',
        DATABASE: 'postgres',
        PASSWORD: 'mysecretpassword',
        PORT: 5432,
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    test: {
        USER: 'postgres',
        HOST: 'localhost',
        DATABASE: 'test',
        PASSWORD: 'mysecretpassword',
        PORT: 5432,
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
};