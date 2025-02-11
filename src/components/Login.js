import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedRole = localStorage.getItem('role');


    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem('token', 'fake-jwt-token'); 
      localStorage.setItem('role', storedRole); 

      
      if (storedRole === 'admin') {
        navigate('/admin');  
      } else {
        navigate('/user');   
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="  col-12 bg-white rounded shadow">

      <form onSubmit={handleLogin} className="border p-4 rounded shadow">
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="username"
            className="form-control"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="mt-3">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => alert("Password recovery functionality")}
            >
              Forgot password?
            </button>
          </p>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>

        

        <p className="text-center mt-3">
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
        
      </form>
      </div>
      </div>
  );
};

export default Login;
