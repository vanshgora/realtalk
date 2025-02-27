import { useForm } from "react-hook-form";
import { TextInput, PasswordInput, Button, Paper, Title, Anchor, Container } from "@mantine/core";
import { login } from "../../services/userServices";
import { Navigate, useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      navigate('/');
    } catch (error) {
      console.log(error)
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <Container size={450} className="p-8 bg-gray-800 rounded-lg shadow-lg">
        <Title order={2} className="text-white text-center mb-6 text-2xl">
          Welcome Back 👋
        </Title>

        <Paper p="xl" radius="md" className="bg-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <TextInput
              label="Email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full"
              size="lg"
              styles={{
                label: { color: "white", fontSize: "1rem" },
                input: { fontSize: "1rem", padding: "12px" },
              }}
            />

            {/* Password Input */}
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full"
              size="lg"
              styles={{
                label: { color: "white", fontSize: "1rem" },
                input: { fontSize: "1rem", padding: "12px" },
              }}
            />

            {/* Forgot Password & Login Button */}
            <div className="flex justify-between items-center">
              <Anchor component="button" className="text-blue-400 hover:underline text-sm">
                Forgot password?
              </Anchor>
            </div>

            <Button type="submit" fullWidth size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
              Login
            </Button>
            <a className="text-blue-400 hover:underline text-sm" onClick={() => {
              navigate('/register');
            }}>
              Dont't Have Account? Register
            </a>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
