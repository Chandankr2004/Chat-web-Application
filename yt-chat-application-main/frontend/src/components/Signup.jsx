import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "..";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/register`,
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-black/60 backdrop-blur-md border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Signup
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-3">
          <input
            value={user.fullName}
            onChange={(e) =>
              setUser({ ...user, fullName: e.target.value })
            }
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white outline-none"
            type="text"
            placeholder="Full Name"
            required
          />

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

          <input
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            className="w-full px-3 py-2 rounded-md bg-gray-800 text-white outline-none"
            type="password"
            placeholder="Confirm Password"
            required
          />

          {/* Gender */}
          <div className="flex gap-6 text-white text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={user.gender === "male"}
                onChange={() =>
                  setUser({ ...user, gender: "male" })
                }
              />
              Male
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={user.gender === "female"}
                onChange={() =>
                  setUser({ ...user, gender: "female" })
                }
              />
              Female
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Signup
          </button>

          <p className="text-center text-gray-300 text-sm">
            Already have an account?{" "}
            <Link className="text-blue-400" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
