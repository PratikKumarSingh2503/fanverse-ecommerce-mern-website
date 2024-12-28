import React, { useState } from "react";
import loginSignImage from "../Image/login.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      toast(result.message);

      if (result.alert) {
        dispatch(loginRedux(result));
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again later.");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md flex m-auto">
          <img src={loginSignImage} alt="Login" className="w-full" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 mt-1 mb-2 bg-slate-200 rounded focus:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
              required
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 text-white text-xl font-medium py-1 rounded-full mt-4"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
