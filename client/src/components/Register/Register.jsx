import { useState } from "react";
import { TextInput, PasswordInput, Button, Card, Title } from "@mantine/core";
import { register } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
// import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        contact: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register(formData);
            navigate("/");
          } catch (error) {
            console.log(error)
            alert(error.message);
          }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <Card shadow="lg" p="xl" className="w-full max-w-md bg-gray-800 text-white">
                <Title order={2} align="center" mb="lg">
                    Create an Account 🚀
                </Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextInput
                        label="First Name"
                        placeholder="Enter your first name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Enter your last name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <TextInput
                        label="Username"
                        placeholder="Choose a username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <TextInput
                        label="Contact"
                        placeholder="Enter your phone number"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Re-enter your password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <Button type="submit" fullWidth mt="md" className="bg-blue-500 hover:bg-blue-600">
                        Register
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Register;
