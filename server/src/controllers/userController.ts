import { Request, Response } from 'express';
import User from '../models/user_model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "thisissecret";

const register = async (req: Request, res: Response) => {
    try {
        const { email, password, first_name, last_name, contact, username } = req.body;
        if (!email || !password || !first_name || !last_name || !contact || !username) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        if (contact.length !== 10) {
            return res.status(400).json({ message: "Contact number must be 10 digits long" });
        }

        if (username.length < 6) {
            return res.status(400).json({ message: "Username must be at least 6 characters long" });
        }

        if (await User.findOne({ username })) {
            return res.status(400).json({ message: "Username already exists", usernameAlreadyExists: true });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "Email already exists", emailAlreadyExists: true });
        }

        if (await User.findOne({ contact })) {
            return res.status(400).json({ message: "Contact already exists", contactAlreadyExists: true });
        }

        const saltRound = 8;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        const newUser = new User({ first_name, last_name, email, contact, username, password: hashedPassword, isOnline: false });
        await newUser.save();

        const token = jwt.sign(
            {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                contact: newUser.contact,
                username: newUser.username,
                isOnline: newUser.isOnline,
                _id: newUser._id
            },
            JWT_SECRET as string, // Secret key
            { expiresIn: "1h" } // Use string format for better readability
        );
        
        return res.status(201).json({ message: "User registered successfully", token });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                contact: user.contact,
                username: user.username,
                isOnline: user.isOnline,
                _id: user._id
            },
            JWT_SECRET as string, // Secret key
            { expiresIn: "1h" } // Use string format for better readability
        );

        return res.status(200).json({ message: "User logged in successfully", token });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { register, login };