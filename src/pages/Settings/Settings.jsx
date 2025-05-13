import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { getUserSettings, saveUserSettings, resetUserSettings, deleteUserAccount } from '../../api/api'; // Add API functions

const translations = {
  en: {
    settings: "Settings",
    notifications: "Notifications",
    language: "Language",
    darkMode: "Dark Mode",
    saveChanges: "Save Changes",
    resetToDefault: "Reset to Default",
    dangerZone: "Danger Zone",
    deleteAccount: "Delete My Account",
    profileVisibility: "Profile Visibility",
    autoUpdate: "Auto Update App",
    securityAlerts: "Security Alerts",
    accentColor: "Accent Color"
  },
  hi: {
    settings: "सेटिंग्स",
    notifications: "सूचनाएँ",
    language: "भाषा",
    darkMode: "डार्क मोड",
    saveChanges: "परिवर्तन सहेजें",
    resetToDefault: "डिफ़ॉल्ट पर रीसेट करें",
    dangerZone: "खतरे का क्षेत्र",
    deleteAccount: "मेरा खाता हटाएं",
    profileVisibility: "प्रोफ़ाइल दृश्यता",
    autoUpdate: "स्वचालित अद्यतन ऐप",
    securityAlerts: "सुरक्षा अलर्ट",
    accentColor: "एक्सेंट रंग"
  },
  // Add more translations for other languages here
};

const Settings = () => {
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [profilePrivate, setProfilePrivate] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [securityAlert, setSecurityAlert] = useState('email');
  const [accentColor, setAccentColor] = useState('indigo');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inactivityWarning, setInactivityWarning] = useState(false);

  // Load settings from the backend
  useEffect(() => {
    const userId = 'yourUserId'; // Use proper method to get the logged-in user's ID
    getUserSettings(userId)
      .then(data => {
        setIsDarkMode(data.isDarkMode);
        setNotificationsEnabled(data.notificationsEnabled);
        setLanguage(data.language);
        setProfilePrivate(data.profilePrivate);
        setAutoUpdate(data.autoUpdate);
        setSecurityAlert(data.securityAlert);
        setAccentColor(data.accentColor);
        setProfilePic(data.profilePic);
      })
      .catch(error => {
        console.error("Failed to load settings", error);
      });

    // Handle session timeout warning
    const timeoutId = setTimeout(() => {
      setInactivityWarning(true);
      setTimeout(() => setInactivityWarning(false), 5000); // Hide after 5 seconds
    }, 30 * 60 * 1000); // 30 minutes of inactivity

    return () => clearTimeout(timeoutId);
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleSaveSettings = () => {
    setLoading(true);
    const userId = 'yourUserId'; // Get the user's ID somehow
    const settingsData = {
      isDarkMode,
      notificationsEnabled,
      language,
      profilePrivate,
      autoUpdate,
      securityAlert,
      accentColor,
      profilePic,
    };

    saveUserSettings(userId, settingsData)
      .then(() => {
        alert(translations[language].saveChanges);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to save settings", error);
        setLoading(false);
      });
  };

  const handleResetSettings = () => {
    const confirmReset = window.confirm("Are you sure you want to reset to default settings?");
    if (confirmReset) {
      resetUserSettings('yourUserId') // Assuming user ID
        .then(() => {
          setIsDarkMode(false);
          setNotificationsEnabled(true);
          setLanguage('en');
          setProfilePrivate(false);
          setAutoUpdate(true);
          setSecurityAlert('email');
          setAccentColor('indigo');
          setProfilePic(null);
          alert(translations[language].resetToDefault);
        })
        .catch(error => {
          console.error("Failed to reset settings", error);
        });
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you absolutely sure you want to delete your account?");
    if (confirmDelete) {
      deleteUserAccount('yourUserId') // Assuming user ID
        .then(() => {
          alert(translations[language].deleteAccount);
          navigate('/auth');
        })
        .catch(error => {
          console.error("Failed to delete account", error);
        });
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'} transition-all duration-500 flex flex-col items-center justify-center p-8`}>
      <h1 className="text-4xl font-bold mb-10">{translations[language].settings}</h1>

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-4xl space-y-8 border border-white/20">
        {/* Dark Mode */}
        <SettingRow title={translations[language].darkMode}>
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-full transition-all"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
            {isDarkMode ? 'Disable' : 'Enable'}
          </button>
        </SettingRow>

        {/* Notifications */}
        <SettingRow title={translations[language].notifications}>
          <ToggleButton isEnabled={notificationsEnabled} setIsEnabled={setNotificationsEnabled} />
        </SettingRow>

        {/* Language */}
        <SettingRow title={translations[language].language}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </SettingRow>

        {/* Profile Visibility */}
        <SettingRow title={translations[language].profileVisibility}>
          <ToggleButton isEnabled={!profilePrivate} setIsEnabled={(value) => setProfilePrivate(!value)} labelOn="Public" labelOff="Private" />
        </SettingRow>

        {/* Auto Update */}
        <SettingRow title={translations[language].autoUpdate}>
          <ToggleButton isEnabled={autoUpdate} setIsEnabled={setAutoUpdate} />
        </SettingRow>

        {/* Security Alerts */}
        <SettingRow title={translations[language].securityAlerts}>
          <select
            value={securityAlert}
            onChange={(e) => setSecurityAlert(e.target.value)}
            className="bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push Notifications</option>
          </select>
        </SettingRow>

        {/* Accent Color */}
        <SettingRow title={translations[language].accentColor}>
          <select
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="indigo">Indigo</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
          </select>
        </SettingRow>

        {/* Profile Picture Upload */}
        <SettingRow title="Profile Picture">
          <input type="file" onChange={handleProfilePicChange} className="border rounded-lg py-2 px-4" />
          {profilePic && <img src={profilePic} alt="Profile Pic" className="mt-4 w-32 h-32 object-cover rounded-full" />}
        </SettingRow>

        {/* Save Settings */}
        <div className="text-center pt-4">
          <button
            onClick={handleSaveSettings}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all"
          >
            {loading ? 'Saving...' : '💾 ' + translations[language].saveChanges}
          </button>
        </div>

        {/* Reset Settings */}
        <div className="text-center pt-4">
          <button
            onClick={handleResetSettings}
            className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all"
          >
            🔄 {translations[language].resetToDefault}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t border-white/20">
          <h2 className="text-xl text-red-400 font-semibold mb-2">{translations[language].dangerZone}</h2>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all"
          >
            🗑 {translations[language].deleteAccount}
          </button>
        </div>
      </div>

      {/* Session Inactivity Warning */}
      {inactivityWarning && (
        <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-black p-4 text-center">
          <p>Warning: You've been inactive for 30 minutes!</p>
        </div>
      )}
    </div>
  );
};

// Reusable Setting Row
const SettingRow = ({ title, children }) => (
  <div className="flex items-center justify-between">
    <span className="text-xl">{title}</span>
    {children}
  </div>
);

// Toggle Button
const ToggleButton = ({ isEnabled, setIsEnabled, labelOn = 'On', labelOff = 'Off' }) => (
  <button
    onClick={() => setIsEnabled(prev => !prev)}
    className={`py-2 px-5 rounded-full font-semibold transition-all duration-300 ${
      isEnabled ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
    }`}
  >
    {isEnabled ? labelOn : labelOff}
  </button>
);

export default Settings;
