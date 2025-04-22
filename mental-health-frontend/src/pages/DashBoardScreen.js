import React, { useState, useEffect } from 'react';
import './DashBoardScreen.css'; 
const DashboardScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://localhost:5000/api/users/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        console.log('Fetched user:', data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const renderUser = () => {
    if (!user) return null;

    const imagePath = user.imagePath ? user.imagePath.replace(/\\/g, '/') : null;
    const imageUrl = imagePath ? `http://localhost:5000/${imagePath}` : null;

    return (
      <div className="card">
        {imageUrl ? (
          <img src={imageUrl} alt="User" className="avatar" onError={(e) => { e.target.src = ''; }} />
        ) : (
          <p>No Image Available</p>
        )}
        <h2>{user.username}</h2>
        <p><strong>Height:</strong> {user.height}</p>
        <p><strong>Weight:</strong> {user.weight}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Sleep Time:</strong> {user.sleepTime}</p>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {loading ? <div className="loading">Loading...</div> : renderUser()}
    </div>
  );
};

export default DashboardScreen;
