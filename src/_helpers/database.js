const { DataSource } = require('typeorm');
const dotenv = require('dotenv');

dotenv.config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'user_management',
    synchronize: true, // Set to false in production
    logging: true,
    entities: ['src/entities/**/*.js'],
    subscribers: [],
    migrations: [],
});

module.exports = { AppDataSource }; 