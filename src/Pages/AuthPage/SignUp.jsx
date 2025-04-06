import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
const authContext = useContext(AuthContext);
if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
}
const { signUpUser } = authContext;
const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    try {
        await signUpUser(email.value, password.value);
        navigate("/dashboard"); 
        alert("Sign up successful");
        console.log(signUpUser);
    } catch (error) {
        console.error("Error signing up:", error);
    }
};

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                >
                    Sign Up
                </button>
            </form>
        </div>
    </div>
);
};

export default SignUp;