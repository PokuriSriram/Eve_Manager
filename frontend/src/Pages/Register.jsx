import { useState } from "react";
import axios from "axios";
import Login from "./Login";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate=useNavigate();
    const [login, SetLogin] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const userData = {
            fullname: fullName,
            email: email,
            password: password,
            phone: phone,
        };

        try {
            const response = await axios.post(
                "http://localhost:5000/api/register",
                userData
            );

            alert(response.data.message);

            setFullName("");
            setEmail("");
            setPassword("");
            setPhone("");
            navigate("/login");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    if (login) {
        return <Login />;
    }

    return (
        <main>
            <div className="register-cont">

                <div className="register-img">
                    <div className="register-img-content">
                        <h1>Create Account</h1>
                        <p>
                            Join us today and start your journey with us.
                        </p>
                    </div>
                </div>

                <div className="register-details">
                    <div className="register-form-container">

                        <div className="register-heading">
                            <h2>Register</h2>
                            <p>Create your account to continue</p>
                        </div>

                        <form onSubmit={handleRegister}>

                            <label className="register-form-label">
                                Full Name
                            </label>
                            <input
                                className="register-input"
                                type="text"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />

                            <label className="register-form-label">
                                Email
                            </label>
                            <input
                                className="register-input"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label className="register-form-label">
                                Password
                            </label>
                            <input
                                className="register-input"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <label className="register-form-label">
                                Phone Number
                            </label>
                            <input
                                className="register-input"
                                type="number"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="register-btn"
                            >
                                Register
                            </button>

                            <p className="register-or">OR</p>

                            <div className="register-login">
                                <p>Already have an account?</p>

                                <button
                                    type="button"
                                    className="register-login-btn"
                                    onClick={() => SetLogin(true)}
                                >
                                    Login
                                </button>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </main>
    );
}

export default Register;