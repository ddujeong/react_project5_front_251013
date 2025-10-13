import {Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './component/NavBar';
import Home from "./pages/Home";
import Board from "./pages/Board";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BoardWrite from "./pages/BoardWrite";
import BoardDetail from "./pages/BoardDetail";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/board/:id' element={<Board />}></Route>
        <Route path='/boardwrite' element={<BoardWrite />}></Route>
        <Route path='/detail' element={<BoardDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
