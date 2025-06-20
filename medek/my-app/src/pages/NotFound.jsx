import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-2">Oops! Sayfa Bulunamadı</p>
      <p className="text-md mb-6">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
      
      <button
        onClick={goHome}
        class="btn btn-link"
      >
        Ana Sayfaya Dön
      </button>
    </div>
  );
};

export default NotFound;
