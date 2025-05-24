import React, { useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './SideDrawer.css';

const pages = [
  { name: 'Dashboard', path: '/dashboardscreen' },
  { name: 'Options', path: '/options' },
  { name: 'Chat', path: '/chat' },
  { name: 'Exercise', path: '/exercise' },
  { name: 'Mood', path: '/mood' },
  { name: 'Food', path: '/food' },
  { name: 'Music Player', path: '/musicplayer' },
  { name: 'Questions', path: '/questions' },
  { name: 'Breathing', path: '/breathing' },
  { name: 'Medications', path: '/medications' }, // <-- Add this line
];

const SideDrawer = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Get user image or fallback avatar
  let imageUrl = '';
  if (user) {
    const imagePath = user.imagePath ? user.imagePath.replace(/\\/g, '/') : null;
    imageUrl = imagePath
      ? `http://localhost:5000/${imagePath}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}`;
  }

  return (
    <>
      <button className="drawer-toggle" onClick={() => setOpen(!open)}>
        &#9776;
      </button>
      <nav className={`side-drawer ${open ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>&times;</button>
        <div className="drawer-user">
          <img
            src={imageUrl}
            alt="User"
            className="drawer-avatar"
            onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=User'; }}
          />
          <div className="drawer-username">
            {user ? (user.fullName || user.username || 'Guest') : 'Guest'}
          </div>
        </div>
        <ul>
          {pages.map(page => (
            <li key={page.name}>
              <Link
                to={page.path}
                className={location.pathname === page.path ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {page.name}
              </Link>
            </li>
          ))}
          <li>
            <NavLink to="/stress-relief" activeClassName="active">
              🫧 Stress Relief Game
            </NavLink>
          </li>
          <li>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideDrawer;