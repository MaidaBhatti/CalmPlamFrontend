import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <div className="screen">
        <div className="header">
          <h1>Welcome, {user?.name}! 👋</h1>
          <p>Your AI-powered style assistant</p>
        </div>

        <div className="card">
          <h3>🎯 Quick Actions</h3>
          <div style={{ marginTop: '15px' }}>
            <Link to="/virtual-tryon" className="btn btn-primary">
              📸 Virtual Try-On
            </Link>
            <Link to="/ai-style" className="btn btn-secondary">
              🤖 AI Style Suggestions
            </Link>
          </div>
        </div>

        <div className="card">
          <h3>📊 Your Profile</h3>
          <div style={{ marginTop: '15px' }}>
            <p><strong>Body Type:</strong> {user?.bodyType || 'Not set'}</p>
            <p><strong>Height:</strong> {user?.height ? `${user.height} cm` : 'Not set'}</p>
            <p><strong>Style:</strong> {user?.style || 'Not set'}</p>
            <p><strong>Skin Tone:</strong> {user?.skinTone || 'Not set'}</p>
          </div>
        </div>

        <div className="card">
          <h3>🔥 Trending Styles</h3>
          <div className="grid" style={{ marginTop: '15px' }}>
            <div className="grid-item">
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>👔</div>
              <div>Business Casual</div>
            </div>
            <div className="grid-item">
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>👗</div>
              <div>Summer Dresses</div>
            </div>
            <div className="grid-item">
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>👟</div>
              <div>Streetwear</div>
            </div>
            <div className="grid-item">
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧥</div>
              <div>Winter Coats</div>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-secondary" 
          onClick={logout}
          style={{ marginTop: '20px' }}
        >
          Sign Out
        </button>
      </div>

      <div className="bottom-nav">
        <Link to="/" className="nav-item active">
          <div className="nav-icon">🏠</div>
          <div>Home</div>
        </Link>
        <Link to="/virtual-tryon" className="nav-item">
          <div className="nav-icon">📸</div>
          <div>Try-On</div>
        </Link>
        <Link to="/ai-style" className="nav-item">
          <div className="nav-icon">🤖</div>
          <div>AI Style</div>
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;