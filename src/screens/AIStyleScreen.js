import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AIStyleScreen = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const occasions = [
    '💼 Business Meeting',
    '🎉 Party',
    '☕ Casual Date',
    '🏃‍♀️ Workout',
    '🌴 Beach Day',
    '❄️ Winter Outing',
    '🎭 Formal Event',
    '🛍️ Shopping'
  ];

  const generateSuggestions = async (occasionPrompt = '') => {
    setLoading(true);
    
    const fullPrompt = occasionPrompt || prompt;
    
    // Create a detailed prompt based on user profile and request
    const aiPrompt = `
      Generate fashion suggestions for a person with:
      - Body type: ${user?.bodyType || 'not specified'}
      - Height: ${user?.height || 'not specified'} cm
      - Skin tone: ${user?.skinTone || 'not specified'}
      - Cultural background: ${user?.culture || 'not specified'}
      - Preferred style: ${user?.style || 'not specified'}
      - Budget: ${user?.budget || 'not specified'}
      
      Request: ${fullPrompt}
      
      Please provide specific clothing recommendations with colors, styles, and brands.
    `;

    try {
      // Simulate AI response - in real app, this would call an AI API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock suggestions based on user profile
      const mockSuggestions = generateMockSuggestions(fullPrompt, user);
      setSuggestions(mockSuggestions);
      
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
      alert('Failed to generate suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateMockSuggestions = (prompt, userProfile) => {
    const suggestions = [];
    
    // Generate suggestions based on user profile
    if (prompt.toLowerCase().includes('business') || prompt.includes('💼')) {
      suggestions.push({
        id: 1,
        title: 'Professional Power Look',
        description: `A tailored blazer in navy blue complements your ${userProfile?.skinTone || 'skin tone'} beautifully. Pair with matching trousers and a crisp white shirt.`,
        items: ['Navy Blazer', 'White Button-up', 'Tailored Trousers', 'Leather Loafers'],
        colors: ['Navy', 'White', 'Black'],
        price: '$200-400',
        confidence: '95%'
      });
    }
    
    if (prompt.toLowerCase().includes('casual') || prompt.includes('☕')) {
      suggestions.push({
        id: 2,
        title: 'Effortless Casual',
        description: `Perfect for your ${userProfile?.bodyType || 'body type'}! A soft knit sweater with well-fitted jeans creates a relaxed yet put-together look.`,
        items: ['Knit Sweater', 'Dark Jeans', 'White Sneakers', 'Crossbody Bag'],
        colors: ['Beige', 'Denim Blue', 'White'],
        price: '$80-150',
        confidence: '92%'
      });
    }
    
    if (prompt.toLowerCase().includes('party') || prompt.includes('🎉')) {
      suggestions.push({
        id: 3,
        title: 'Party Ready',
        description: `A statement dress that flatters your figure with accessories that complement your ${userProfile?.culture || 'style'} background.`,
        items: ['Little Black Dress', 'Statement Earrings', 'Heeled Sandals', 'Clutch'],
        colors: ['Black', 'Gold', 'Silver'],
        price: '$120-250',
        confidence: '88%'
      });
    }
    
    // Default suggestion if no specific occasion
    if (suggestions.length === 0) {
      suggestions.push({
        id: 4,
        title: 'Versatile Everyday Look',
        description: `Based on your ${userProfile?.style || 'preferred'} style, this outfit works for multiple occasions and flatters your ${userProfile?.bodyType || 'body type'}.`,
        items: ['Versatile Top', 'Comfortable Bottoms', 'Stylish Shoes', 'Accessories'],
        colors: ['Neutral tones that complement your skin'],
        price: '$100-200',
        confidence: '90%'
      });
    }
    
    return suggestions;
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="header">
          <h1>🤖 AI Style Assistant</h1>
          <p>Get personalized fashion advice</p>
        </div>

        <div className="card">
          <h3>What's the occasion?</h3>
          <div className="grid">
            {occasions.map(occasion => (
              <div
                key={occasion}
                className="grid-item"
                onClick={() => generateSuggestions(occasion)}
              >
                {occasion}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Or describe what you need</h3>
          <div className="form-group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., 'I need an outfit for a first date that's comfortable but stylish' or 'What colors look good with my skin tone?'"
              rows={3}
            />
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => generateSuggestions()}
            disabled={loading || !prompt.trim()}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                Generating...
              </div>
            ) : (
              '✨ Get AI Suggestions'
            )}
          </button>
        </div>

        {suggestions.length > 0 && (
          <div>
            <h3>💡 AI Recommendations</h3>
            {suggestions.map(suggestion => (
              <div key={suggestion.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4>{suggestion.title}</h4>
                  <span style={{ 
                    background: '#e8f5e8', 
                    color: '#2d5a2d', 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px' 
                  }}>
                    {suggestion.confidence} match
                  </span>
                </div>
                
                <p style={{ marginBottom: '15px', color: '#666' }}>
                  {suggestion.description}
                </p>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Items:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                    {suggestion.items.map(item => (
                      <span key={item} style={{
                        background: '#f0f0f0',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <strong>Colors:</strong> {suggestion.colors.join(', ')}
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <strong>Price Range:</strong> {suggestion.price}
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-secondary" style={{ flex: 1 }}>
                    🛍️ Shop Items
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1 }}>
                    💾 Save Look
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom-nav">
        <Link to="/" className="nav-item">
          <div className="nav-icon">🏠</div>
          <div>Home</div>
        </Link>
        <Link to="/virtual-tryon" className="nav-item">
          <div className="nav-icon">📸</div>
          <div>Try-On</div>
        </Link>
        <Link to="/ai-style" className="nav-item active">
          <div className="nav-icon">🤖</div>
          <div>AI Style</div>
        </Link>
      </div>
    </div>
  );
};

export default AIStyleScreen;