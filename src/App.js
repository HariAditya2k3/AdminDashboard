import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import SignUp from './components/Signup';
import Admin from './components/Admin';
import User from './components/User';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
      
        <div className="auth-wrapper d-flex justify-content-center align-items-center vh-100">
          <div className="col-md-4 col-sm-6 col-12">
            <Routes>
             
              <Route index element={<Login />} />

              
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />

            
              <Route
                path="/admin"
                element={<PrivateRoute role="admin" element={<Admin />} />}
              />
              <Route
                path="/user"
                element={<PrivateRoute role="user" element={<User />} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
