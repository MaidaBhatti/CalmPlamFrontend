import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Fetching questions from API
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://yourapi.com/mental-health-questions');
      setQuestions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load questions.');
      setLoading(false);
    }
  };

  // Disable submit if not all questions have been answered
  useEffect(() => {
    setIsSubmitDisabled(Object.keys(responses).length < questions.length);
  }, [responses, questions]);

  const handleOptionPress = (questionId, optionId) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) {
      alert('Please answer all questions.');
      return;
    }

    const totalScore = Object.values(responses).reduce((sum, val) => sum + val, 0);
    let result;

    if (totalScore <= questions.length * 2) {
      result = "You are fine.";
    } else if (totalScore <= questions.length * 3) {
      result = "You might be experiencing mild symptoms of anxiety or depression.";
    } else if (totalScore <= questions.length * 4) {
      result = "You might be experiencing moderate symptoms of anxiety or depression.";
    } else {
      result = "You might be experiencing severe symptoms of anxiety or depression.";
    }

    alert(result); // or navigate to another page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#FFE5E5' }}>
      {questions.map(question => (
        <div key={question.id} style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>{question.question}</div>
          {question.options.map(option => (
            <button
              key={option.id}
              style={{
                padding: '10px',
                backgroundColor: responses[question.id] === option.id ? '#6495ED' : '#add8e6',
                borderRadius: '10px',
                marginBottom: '5px',
                width: '100%',
                textAlign: 'left'
              }}
              onClick={() => handleOptionPress(question.id, option.id)}
            >
              {option.text}
            </button>
          ))}
        </div>
      ))}
      <button
        style={{
          padding: '15px',
          backgroundColor: isSubmitDisabled ? '#add8e6' : '#6495ED',
          borderRadius: '10px',
          color: '#fff',
          width: '100%',
          textAlign: 'center',
        }}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
    </div>
  );
};

export default QuestionScreen;
