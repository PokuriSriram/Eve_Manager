
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Register from "./Register";
import Home from "./Home";
import './login.css'
import { useNavigate } from "react-router-dom";
function Login() {
    const [curUser, setCurUser] = useState(null);
    const [show, setShow] = useState(false);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = {
            phone: phone,
            password: password
        };
        try {
            const response = await axios.post(
                "http://localhost:5000/api/login", userData
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.token));
            if (response.data.message == "success") {
                alert("Hello " + response.data.name);
                setCurUser(response.data.name);
            }
            navigate("/home");
        } catch (error) {
            console.log("error");
            alert(error.response.data.message);
        }
    }
    if (curUser) {
        return <Home name={curUser} />
    }
    if (show) {
        return <Register />
    }
    return (
        <main>
            <div className="cont">
                <div id="img">
                    <div>
                        <h1>Welcome Back</h1>
                        <p>Glad to see you again!.please login to continue your journey</p>
                    </div>
                </div>
                <div id="details">
                    <div className="heading">
                        <p>Login to your account to continue</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <label className="form-label">Phone:</label>
                        <br />
                        <input className="form-control" type="number" placeholder="Enter your number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <br />
                        <label className="label-form">password</label>
                        <br />
                        <input className="form-control" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <div>
                            <p>
                                <input type="checkbox" />
                                Remember me</p>
                            <span>Forgot Password?</span>
                        </div>
                        <br />
                        <button type="submit" id="loginBtn">Login</button>

                        <p className="or">or</p>

                        <div>
                            <p>
                                Don't have an account?
                                <Link to="/register">
                                    <button>Register</button>
                                </Link>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    )
}

export default Login;