import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const [userDetails, setUserDetails] = useState({});
  const [availableServices, setAvailableServices] = useState([]);
  const [request, setRequest] = useState('');
  const navigate = useNavigate();  
    useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    setUserDetails({ username: storedUsername, role: storedRole });
    const services = JSON.parse(localStorage.getItem('products')) || [];
    setAvailableServices(services);
  }, []);

  const handleRequestService = () => {
    const userRequests = JSON.parse(localStorage.getItem('userRequests')) || [];
    userRequests.push(request);
    localStorage.setItem('userRequests', JSON.stringify(userRequests));
    alert('Request sent successfully');
    setRequest('');
  };


  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/sign-in');  
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          
          <div className="card mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h3 className="card-title">Welcome, {userDetails.username}</h3>
                <p className="card-text">Your role: {userDetails.role}</p>
              </div>
              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

         
          <div className="card mb-4">
            <div className="card-body">
              <h4>Available Services</h4>
              {availableServices.length === 0 ? (
                <p>No services available at the moment.</p>
              ) : (
                <ul className="list-group">
                  {availableServices.map((service, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{service.productName} - {service.type}</span>
                      <button 
                        className="btn btn-info"
                        onClick={() => setRequest(service.productName)}
                      >
                        Request Service
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          
          {request && (
            <div className="card">
              <div className="card-body">
                <h4>Request Service</h4>
                <p>You are requesting: {request}</p>
                <button 
                  className="btn btn-primary"
                  onClick={handleRequestService}
                >
                  Submit Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
