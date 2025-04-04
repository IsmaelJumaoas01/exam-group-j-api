const express = require('express');
const { AppDataSource } = require('../_helpers/database');
const User = require('../entities/User');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const router = express.Router();

// Validation schema for user creation
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// In-memory array to store exams
let exams = [];

router.post('/create', async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                error: error.details[0].message
            });
            return;
        }

        const { username, email, password } = req.body;

        // Check if user already exists
        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOne({
            where: [{ email }, { username }]
        });

        if (existingUser) {
            res.status(StatusCodes.CONFLICT).json({
                error: 'User with this email or username already exists'
            });
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hashedPassword;

        // Save user to database
        await userRepository.save(user);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.status(StatusCodes.CREATED).json({
            message: 'User created successfully',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error'
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userRepository = AppDataSource.getRepository(User);

        // Find user by ID
        const user = await userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                error: 'User not found'
            });
            return;
        }

        // Delete user
        await userRepository.remove(user);

        res.status(StatusCodes.OK).json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error'
        });
    }
});

router.get('/list', async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        
        res.status(StatusCodes.OK).json({
            users: usersWithoutPasswords
        });
        
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error'
        });
    }
});

router.get('/retrieve/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userRepository = AppDataSource.getRepository(User);

        // Find user by ID
        const user = await userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                error: 'User not found'
            });
            return;
        }

        // Remove password from response
        const { password, ...userWithoutPassword } = user;

        res.status(StatusCodes.OK).json({
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error'
        });
    }
});

router.get('/exams', (req, res) => {
    const hardcodedUsers = [
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' },
        { id: 3, username: 'user3', email: 'user3@example.com' }
    ];
    
    res.status(StatusCodes.OK).json({
        users: hardcodedUsers
    });
});


module.exports = router; 