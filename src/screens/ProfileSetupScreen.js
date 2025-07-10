import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProfileSetupScreen = () => {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    bodyType: '',
    height: '',
    weight: '',
    skinTone: '',
    culture: '',
    style: '',
    budget: ''
  });
  
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const bodyTypes = [
    { id: 'pear', name: 'Pear', emoji: '🍐' },
    { id: 'apple', name: 'Apple', emoji: '🍎' },
    { id: 'hourglass', name: 'Hourglass', emoji: '⏳' },
    { id: 'rectangle', name: 'Rectangle', emoji: '📱' },
    { id: 'inverted-triangle', name: 'Inverted Triangle', emoji: '🔺' }
  ];

  const skinTones = [
    { id: 'fair', name: 'Fair', color: '#fdbcb4' },
    { id: 'light', name: 'Light', color: '#edb98a' },
    { id: 'medium', name: 'Medium', color: '#d08b5b' },
    { id: 'olive', name: 'Olive', color: '#ae7242' },
    { id: 'tan', name: 'Tan', color: '#8d5524' },
    { id: 'dark', name: 'Dark', color: '#654321' }
  ];

  const cultures = [
    'Western', 'Asian', 'African', 'Middle Eastern', 'Latin American', 'Indian', 'Other'
  ];

  const styles = [
    'Casual', 'Formal', 'Bohemian', 'Minimalist', 'Vintage', 'Streetwear', 'Classic', 'Trendy'
  ];

  const handleChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      updateProfile(profileData);
      navigate('/');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep1 = () => (
    <div>
      <h2>Tell us about your body</h2>
      
      <div className="form-group">
        <label>Body Type</label>
        <div className="grid">
          {bodyTypes.map(type => (
            <div
              key={type.id}
              className={`grid-item ${profileData.bodyType === type.id ? 'selected' : ''}`}
              onClick={() => handleChange('bodyType', type.id)}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{type.emoji}</div>
              <div>{type.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Height (cm)</label>
        <input
          type="number"
          value={profileData.height}
          onChange={(e) => handleChange('height', e.target.value)}
          placeholder="Enter your height"
        />
      </div>

      <div className="form-group">
        <label>Weight (kg)</label>
        <input
          type="number"
          value={profileData.weight}
          onChange={(e) => handleChange('weight', e.target.value)}
          placeholder="Enter your weight"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2>Your style preferences</h2>
      
      <div className="form-group">
        <label>Skin Tone</label>
        <div className="grid">
          {skinTones.map(tone => (
            <div
              key={tone.id}
              className={`grid-item ${profileData.skinTone === tone.id ? 'selected' : ''}`}
              onClick={() => handleChange('skinTone', tone.id)}
            >
              <div 
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  backgroundColor: tone.color,
                  margin: '0 auto 8px'
                }}
              ></div>
              <div>{tone.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Cultural Background</label>
        <select
          value={profileData.culture}
          onChange={(e) => handleChange('culture', e.target.value)}
        >
          <option value="">Select your cultural background</option>
          {cultures.map(culture => (
            <option key={culture} value={culture}>{culture}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2>Final touches</h2>
      
      <div className="form-group">
        <label>Preferred Style</label>
        <div className="grid">
          {styles.map(style => (
            <div
              key={style}
              className={`grid-item ${profileData.style === style ? 'selected' : ''}`}
              onClick={() => handleChange('style', style)}
            >
              {style}
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Budget Range</label>
        <select
          value={profileData.budget}
          onChange={(e) => handleChange('budget', e.target.value)}
        >
          <option value="">Select your budget range</option>
          <option value="budget">Budget ($0-$50)</option>
          <option value="mid">Mid-range ($50-$200)</option>
          <option value="premium">Premium ($200-$500)</option>
          <option value="luxury">Luxury ($500+)</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="screen">
        <div className="header">
          <h1>Profile Setup</h1>
          <p>Step {step} of 3</p>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
          {step > 1 && (
            <button className="btn btn-secondary" onClick={handleBack}>
              Back
            </button>
          )}
          <button className="btn btn-primary" onClick={handleNext}>
            {step === 3 ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupScreen;