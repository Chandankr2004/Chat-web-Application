import Signup from "./components/Signup";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import { BASE_URL } from ".";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io(BASE_URL, {
        query: {
          userId: authUser._id,
        },
      });

      dispatch(setSocket(socketio));

      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, dispatch, socket]);

  return (
    <BrowserRouter>
      <div className="p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
