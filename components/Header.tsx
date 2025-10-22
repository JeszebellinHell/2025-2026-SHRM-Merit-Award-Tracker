
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-800 text-white rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                </svg>
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  WGU SHRM Chapter Merit Award
                </h1>
                <p className="text-slate-500">Leadership Progress Tracker</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
