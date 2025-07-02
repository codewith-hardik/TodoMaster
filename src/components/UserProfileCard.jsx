import React from 'react';
import { FaUserCircle, FaEnvelope, FaInfoCircle } from 'react-icons/fa';

const UserProfileCard = () => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-6 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center p-6">
        <FaUserCircle className="h-20 w-20 text-blue-400 mb-2" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Hardik Chavda</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 flex items-center"><FaEnvelope className="mr-2" /> chavdahardik3690@gmail.com</p>
        <p className="text-gray-600 dark:text-gray-300 text-center flex items-center"><FaInfoCircle className="mr-2" />Passionate React Developer</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
