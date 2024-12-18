import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing

// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;  // Extract username and password from request body
  // Find the user in the database by username
  const user = await User.findOne({
    where: { username },
  });
  
  console.log('LOGIN', user?.password)
  // If user is not found, send an authentication failed response
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Compare the provided password with the stored hashed password
  console.log(password)
  const passwordIsValid = await bcrypt.compare(password, user.password);
  console.log('passwordisValid',passwordIsValid)
  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Wrong Password' });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });  // Send the token as a JSON response
};

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post('/login', login);  // Define the login route

router.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
      // Check if user already exists
      // const existingUser = await User.findOne({ where: { username } });
      // if (existingUser) {
      //     return res.status(400).json({ message: 'Username already taken' });
      // }

      // Create and save the new user
      const newUser = await User.create({ username, password: '' });
      await newUser.setPassword(password);  // Hash the password and set it
      await newUser.save();

      const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  console.log(token);
      return res.status(201).json({token});  // Add return here
  } catch (error) {
      console.error("Sign-up error:", error);
      return res.status(500).json({ message: 'Error during sign-up' });  // Add return here
  }
});

export default router;  // Export the router instance
