import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../components/useLocalStorage';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [user, , removeUser] = useLocalStorage('user', null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (!savedUser) {
      navigate('/Auth');
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser?.username) {
        setUserInfo(parsedUser);
      } else {
        navigate('/Auth');
      }
    } catch (e) {
      console.error('Invalid user data in localStorage:', e);
      navigate('/Auth');
    }
  }, [navigate]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    removeUser();
    localStorage.removeItem('token');
    navigate('/Auth');
  };

  const handleWidgetClick = (widgetName) => {
    setSelectedWidget(selectedWidget === widgetName ? null : widgetName);
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Safety Incidents',
        data: [3, 4, 2, 5, 4, 6],
        borderColor: '#E91E63',
        fill: false,
        tension: 0.1,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#E91E63',
      },
    ],
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-300 ease-in-out ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-teal-100 via-blue-300 to-indigo-400'}`}>
      <div className={`bg-white/10 rounded-3xl shadow-2xl w-full max-w-7xl p-10 transition-all duration-300 ease-in-out ${darkMode ? 'bg-opacity-40 text-white' : 'bg-opacity-10 text-gray-900'}`}>
        
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600 mb-2">Guardify Dashboard 🛡️</h2>
            {userInfo && <p className="text-lg text-yello-300">Welcome back, <strong>{userInfo.username}</strong>!</p>}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`text-sm p-3 rounded-full border-2 transition-all duration-300 ${darkMode ? 'border-gray-500 text-white' : 'border-gray-900 text-gray-900'}`}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-full font-semibold transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* AI Protection */}
          <WidgetCard
            title="🧠 AI Protection"
            description="Face & NSFW detection is running"
            selected={selectedWidget === 'AI Protection'}
            onClick={() => handleWidgetClick('AI Protection')}
            color="pink"
          />

          {/* Reported Posts */}
          <WidgetCard
            title="⚠️ Reported Posts"
            description="5 flagged contents this week"
            selected={selectedWidget === 'Reported Posts'}
            onClick={() => handleWidgetClick('Reported Posts')}
            color="yellow"
          />

          {/* Device Activity */}
          <WidgetCard
            title="📲 Device Activity"
            description="2 active devices linked"
            selected={selectedWidget === 'Device Activity'}
            onClick={() => handleWidgetClick('Device Activity')}
            color="green"
          />
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-semibold text-center mb-6">Safety Incident Trends</h3>
          <Line
            data={data}
            options={{
              responsive: true,
              plugins: {
                title: { display: false },
                legend: { position: 'top' },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: darkMode ? '#444' : '#e0e0e0',
                  },
                },
              },
            }}
          />
        </div>

        <div className="flex justify-between space-x-4">
          <a
            href="/scan"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
          >
            Run Safety Scan
          </a>
          <a
            href="/report"
            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 px-8 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
          >
            View Reports
          </a>
        </div>

        <footer className="mt-12 text-center text-gray-400">
          <p>© 2025 Guardify. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

const WidgetCard = ({ title, description, selected, onClick, color }) => {
  const base = {
    pink: ['bg-pink-600', 'bg-pink-50', 'text-pink-600'],
    yellow: ['bg-yellow-600', 'bg-yellow-50', 'text-yellow-600'],
    green: ['bg-green-600', 'bg-green-50', 'text-green-600'],
  }[color];

  return (
    <div
      onClick={onClick}
      className={`widget neumorphism p-6 rounded-3xl shadow-lg transition-all duration-300 hover:scale-105 ${
        selected ? `${base[0]} text-white` : `${base[1]} ${base[2]}`
      }`}
    >
      <h4 className="text-2xl font-semibold mb-2">{title}</h4>
      <p className="text-lg">{description}</p>
      <div className="mt-4 flex justify-center">
        <div
          className={`${
            selected ? 'bg-white text-gray-900' : `${base[0]} text-white`
          } px-4 py-1 rounded-full text-sm font-semibold`}
        >
          {selected ? 'Selected' : 'View'}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
