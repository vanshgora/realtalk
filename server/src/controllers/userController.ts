import { Request, Response } from 'express'

const register = async (req: Request, res: Response) => {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req: Request, res: Response) => {
    try {

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { register, login };