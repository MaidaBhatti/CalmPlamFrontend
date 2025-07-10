import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VirtualTryOnScreen = () => {
  const [personImage, setPersonImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePersonImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPersonImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGarmentImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setGarmentImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!personImage || !garmentImage) {
      alert('Please upload both person and garment images');
      return;
    }

    setLoading(true);
    
    try {
      // This would integrate with the Hugging Face Kolors Virtual Try-On API
      // For demo purposes, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, you would:
      // 1. Convert images to base64 or upload to a server
      // 2. Call the Hugging Face API: https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On
      // 3. Process the response and display the result
      
      // Simulated result for demo
      setResult(personImage); // In reality, this would be the try-on result
      
    } catch (error) {
      console.error('Try-on failed:', error);
      alert('Try-on failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="header">
          <h1>📸 Virtual Try-On</h1>
          <p>See how clothes look on you with AI</p>
        </div>

        <div className="card">
          <h3>Upload Your Photo</h3>
          <div 
            className="image-upload"
            onClick={() => document.getElementById('person-upload').click()}
          >
            {personImage ? (
              <img src={personImage} alt="Person" className="image-preview" />
            ) : (
              <div>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>👤</div>
                <p>Tap to upload your photo</p>
                <p style={{ fontSize: '12px', color: '#666' }}>
                  Best results with full-body photos
                </p>
              </div>
            )}
          </div>
          <input
            id="person-upload"
            type="file"
            accept="image/*"
            onChange={handlePersonImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        <div className="card">
          <h3>Upload Garment</h3>
          <div 
            className="image-upload"
            onClick={() => document.getElementById('garment-upload').click()}
          >
            {garmentImage ? (
              <img src={garmentImage} alt="Garment" className="image-preview" />
            ) : (
              <div>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>👕</div>
                <p>Tap to upload garment photo</p>
                <p style={{ fontSize: '12px', color: '#666' }}>
                  Clear photos work best
                </p>
              </div>
            )}
          </div>
          <input
            id="garment-upload"
            type="file"
            accept="image/*"
            onChange={handleGarmentImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        <button 
          className="btn btn-primary"
          onClick={handleTryOn}
          disabled={loading || !personImage || !garmentImage}
        >
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
              Processing...
            </div>
          ) : (
            '✨ Try On'
          )}
        </button>

        {result && (
          <div className="card">
            <h3>🎉 Try-On Result</h3>
            <img src={result} alt="Try-on result" className="image-preview" />
            <div style={{ marginTop: '15px' }}>
              <button className="btn btn-secondary">💾 Save Result</button>
              <button className="btn btn-secondary">📤 Share</button>
            </div>
          </div>
        )}
      </div>

      <div className="bottom-nav">
        <Link to="/" className="nav-item">
          <div className="nav-icon">🏠</div>
          <div>Home</div>
        </Link>
        <Link to="/virtual-tryon" className="nav-item active">
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

export default VirtualTryOnScreen;