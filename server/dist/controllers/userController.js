"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "thisissecret";
const register = async (req, res) => {
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
        if (await user_model_1.default.findOne({ username })) {
            return res.status(400).json({ message: "Username already exists", usernameAlreadyExists: true });
        }
        if (await user_model_1.default.findOne({ email })) {
            return res.status(400).json({ message: "Email already exists", emailAlreadyExists: true });
        }
        if (await user_model_1.default.findOne({ contact })) {
            return res.status(400).json({ message: "Contact already exists", contactAlreadyExists: true });
        }
        const saltRound = 8;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRound);
        const newUser = new user_model_1.default({ first_name, last_name, email, contact, username, password: hashedPassword, isOnline: false });
        await newUser.save();
        const token = jsonwebtoken_1.default.sign({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            contact: newUser.contact,
            username: newUser.username,
            isOnline: newUser.isOnline,
            _id: newUser._id
        }, JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Use string format for better readability
        );
        return res.status(201).json({ message: "User registered successfully", token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const passwordMatched = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            contact: user.contact,
            username: user.username,
            isOnline: user.isOnline,
            _id: user._id
        }, JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Use string format for better readability
        );
        return res.status(200).json({ message: "User logged in successfully", token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.login = login;
