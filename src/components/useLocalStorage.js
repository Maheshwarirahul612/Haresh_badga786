import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue, options = {}) {
  // Function to get the stored value from localStorage
  const getStoredValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : (typeof initialValue === 'function' ? initialValue() : initialValue);
    } catch (error) {
      console.error('Error reading localStorage key:', key);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  };

  // State to store the value
  const [storedValue, setStoredValue] = useState(getStoredValue);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Function to set the value to both state and localStorage
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Error setting localStorage key:', key);
    }
  };

  // Function to remove the value from both state and localStorage
  const removeValue = () => {
    if (options.disableRemove) return; // Optional config to prevent remove
    try {
      localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error('Error removing localStorage key:', key);
    }
  };

  // Function to reset the value to the original initialValue
  const resetValue = () => {
    const defaultValue = typeof initialValue === 'function' ? initialValue() : initialValue;
    setValue(defaultValue);
  };

  // Effect to sync with external changes to localStorage
  useEffect(() => {
    if (options.sync !== false) {
      const handleStorageChange = (event) => {
        if (event.key === key) {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : null);
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [key, options.sync]);

  return [storedValue, setValue, removeValue, { resetValue, lastUpdated }];
}
