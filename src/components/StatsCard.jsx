import React from 'react';
import { FaCheckCircle, FaClock, FaTasks } from 'react-icons/fa';

const StatsCard = ({ totalTasks = 0, completedTasks = 0, pendingTasks = 0 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8 mt-4">
      {/* Total Tasks Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <FaTasks className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
            <p className="text-2xl font-semibold text-gray-800">{totalTasks}</p>
          </div>
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <FaCheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="text-2xl font-semibold text-gray-800">{completedTasks}</p>
          </div>
        </div>
      </div>

      {/* Pending Tasks Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 mr-4">
            <FaClock className="h-6 w-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="text-2xl font-semibold text-gray-800">{pendingTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
