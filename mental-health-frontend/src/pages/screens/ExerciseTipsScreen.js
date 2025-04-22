import React, { useState, useEffect } from 'react';
import './ExerciseTipsScreen.css';

const ExerciseTipsScreen = () => {
  const [tips, setTips] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchExercises = async (part = '') => {
    try {
      setLoading(true);
      const url = part
        ? `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${part}`
        : 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back';

      const response = await fetch(url, {
        headers: {
          'X-RapidAPI-Key': 'f2dacec6dfmsh8cb7a8024826691p19b9a5jsn0be357d5031e',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log('API Response:', data);

      if (Array.isArray(data)) {
        setTips(data);
      } else {
        throw new Error('Unexpected response structure');
      }

      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch exercise tips. Please check your network connection and API key.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleSearch = () => {
    fetchExercises(searchQuery);
  };

  return (
    <div className="container">
      <h1 className="header">Exercise Tips</h1>
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for a body part..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="tips-list">
          {tips.map((tip, index) => (
            <div className="card" key={index}>
              <img src={tip.gifUrl || 'https://via.placeholder.com/150'} alt={tip.name} className="image" />
              <h3>{tip.name}</h3>
              <p>Target: {tip.target}</p>
              <p>Equipment: {tip.equipment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseTipsScreen;
