const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { AppDataSource } = require('./_helpers/database');
const userRoutes = require('./routes/user');
const examGroupRoutes = require('./routes/exam-group');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', examGroupRoutes);

// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established');
        
        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

module.exports = app; 