import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body items-center text-center">
          <h1 className="card-title text-4xl mb-4">Welcome!</h1>
          <p className="mb-6">Connect with devs around the world</p>
          <div className="card-actions flex-col w-full gap-3">
            <button 
              className="btn btn-primary w-full" 
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="btn btn-outline w-full" 
              onClick={() => navigate('/login')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;