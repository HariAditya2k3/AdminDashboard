import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [userDetails, setUserDetails] = useState({});
  const [product, setProduct] = useState('');
  const [serviceType, setServiceType] = useState(''); 
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  
  useEffect(() => {
  
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    setUserDetails({ username: storedUsername, role: storedRole });

    
    const storedRequests = JSON.parse(localStorage.getItem('userRequests')) || [];
    setUserRequests(storedRequests);

    const storedTransactions = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    setTransactionHistory(storedTransactions);
  }, []);

  const handleAddProduct = () => {
    
    const newProduct = { productName: product, type: serviceType };
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Product added successfully');
    setProduct('');
    setServiceType('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    alert('Logged out successfully');
    window.location.href = '/sign-in'; 
  };

  return (
    <div className="container-fluid">
      <div className="row">
     
        <div className="col-md-3 bg-light p-4 shadow-sm" style={{ minHeight: '100vh' }}>
          <h4 className="mb-4">Admin Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a className="nav-link" href="#dashboard">Dashboard</a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link" href="#add-product">Add Product</a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link" href="#user-requests">User Requests</a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link" href="#transaction-history">Transaction History</a>
            </li>
            <li className="nav-item mt-4">
              <button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>

     
        <div className="col-md-9 p-4">
          <h2>Welcome, {userDetails.username}!</h2>
          <p>Your role: {userDetails.role}</p>

      
          <div id="add-product" className="mt-5">
            <h3>Add a Product/Service</h3>
            <input 
              type="text" 
              placeholder="Enter product name" 
              className="form-control mb-3" 
              value={product} 
              onChange={(e) => setProduct(e.target.value)} 
            />
            <select 
              className="form-control mb-3" 
              value={serviceType} 
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="">Select Service Type</option>
              <option value="sale">For Sale</option>
              <option value="rental">For Rent</option>
            </select>
            <button 
              className="btn btn-primary"
              onClick={handleAddProduct}
            >
              Add Product/Service
            </button>
          </div>

       
          <div id="user-requests" className="mt-5">
            <h3>User Requests</h3>
            {userRequests.length === 0 ? (
              <p>No requests found</p>
            ) : (
              <ul className="list-group">
                {userRequests.map((request, index) => (
                  <li key={index} className="list-group-item">{request}</li>
                ))}
              </ul>
            )}
          </div>

        
          <div id="transaction-history" className="mt-5">
            <h3>Transaction History</h3>
            {transactionHistory.length === 0 ? (
              <p>No transactions found</p>
            ) : (
              <ul className="list-group">
                {transactionHistory.map((transaction, index) => (
                  <li key={index} className="list-group-item">{transaction}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
