import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { postLogin } from "../../services/apiservice";
import{FaEye,FaEyeSlash} from "react-icons/fa";
import { useEffect } from "react";
const Login = (props) => {
    const navigate = useNavigate();
    //
    const handleLogin=async()=>{
        let data=await postLogin(email,password);
        if(data&&data.EC===0){
            toast.success(data.EM, {
                position: toast.POSITION.TOP_RIGHT,
                className: "foo-bar",
                autoClose: 2000,
                draggable: true,
              });
              localStorage.setItem("user",JSON.stringify(data.DT));
              navigate("/");
             
        }
        if(data&&data.EC!==0){
            toast.error(data.EM, {
                position: toast.POSITION.TOP_RIGHT,
                className: "foo-bar",
                autoClose: 2000,
                draggable: true,
              });
        }

    }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  useEffect(() => {
    showPassword
      ? document
          .querySelector("input[type=password]")
          .setAttribute("type", "text")
      : document
          .querySelector("input[type=text]")
          .setAttribute("type", "password");
  }, [showPassword]);

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate("/register")}>Sign Up</button>
        <span className="contact">Contact us</span>
      </div>
      <div className="login-title">Quizzlet</div>
      <div className="welcome">Hello, who’s this?</div>
      <div className="content-form container-fluid col-4 ">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            name="email"
            id=""
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <span className="input-password">
            <input
              type={"password"}
              name="password"
              id=""
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword && (
              <FaEye
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
                className="eye"
              />
            )}
            {!showPassword && (
              <FaEyeSlash
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
                className="eye"
              />
            )}
          </span>
          <div>
            <span className="forgot">Forgot Password?</span>
          </div>
          <button onClick={handleLogin} className="btn btn-dark btn-login">
            Sign In to Quizzlet
          </button>
          <div className="text-center">
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => handleGoBack()}
            >
              {" "}
              Go back to homepage
            </span>
          </div>
          <div className="divider container-fluid"></div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};
export default Login;
