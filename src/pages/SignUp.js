import { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignUp = async(e) => {
        try {
            await api.post("/api/auth/signup",
                {username, password})
            alert("회원가입 성공!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("회원가입 실패!");
        }
       
    }
    return(
        <div className='form_container'>
            <h2>회원 가입</h2>
            <form onSubmit={handleSignUp}>
                <input type='text' placeholder='아이디' value={username} onChange={(e) => setUsername(e.target.value)}></input><br></br>
                <input type='password' placeholder='비밀번호' value={password} onChange={(e)=> setPassword(e.target.value)}></input><br></br>
                <button type='submit'>회원 가입</button>
            </form>
        </div>
    )
};

export default SignUp;