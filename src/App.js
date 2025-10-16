import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./component/NavBar";
import Home from "./pages/Home";
import Board from "./pages/Board";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BoardWrite from "./pages/BoardWrite";
import BoardDetail from "./pages/BoardDetail";
import { useEffect, useState } from "react";
import api from "./api/axiosConfig";

function App() {
  const [user, setUser] = useState(null); // 현재 로그인한 유저의 이름
  const checkUser = async () => {
    try {
      const res = await api.get("api/auth/me");
      setUser(res.data.username);
    } catch (error) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
      await api.post("/api/auth/logout");
      setUser(null);
    }
  };
  return (
    <div>
      <NavBar onLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login onLogin={setUser} />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/board" element={<Board user={user} />}></Route>
        <Route path="/board/write" element={<BoardWrite user={user} />}></Route>
        <Route path="/board/:id" element={<BoardDetail user={user} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
