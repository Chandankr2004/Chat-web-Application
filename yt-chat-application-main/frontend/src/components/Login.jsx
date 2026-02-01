import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { BASE_URL } from "..";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(setAuthUser(res.data));
      toast.success("Login successful");
      navigate("/home"); // 🔥 after login → Home
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-black/60 backdrop-blur-md border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Login
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <input
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white outline-none"
            type="text"
            placeholder="Username"
            required
          />

          <input
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white outline-none"
            type="password"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Login
          </button>

          <p className="text-center text-gray-300 text-sm">
            Don&apos;t have an account?{" "}
            <Link className="text-blue-400" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
