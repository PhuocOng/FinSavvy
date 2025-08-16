import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust path if needed
import './DarkModeButton.css';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // The component now returns a <label> with a hidden checkbox
  // which is the standard way to create a CSS-only toggle switch.
  return (
    <label className="switch" aria-label="Toggle theme">
      <input
        id="input"
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span className="slider round">
        {/* Sun and Moon container */}
        <div className="sun-moon">
          {/* Moon dots (only visible in dark mode) */}
          <svg className="moon-dot" id="moon-dot-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="5" cy="5" r="5"></circle></svg>
          <svg className="moon-dot" id="moon-dot-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="5" cy="5" r="5"></circle></svg>
          <svg className="moon-dot" id="moon-dot-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="5" cy="5" r="5"></circle></svg>
        </div>

        {/* Clouds (visible in light mode) */}
        <div>
          <svg className="cloud-light" id="cloud-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="25"></circle><circle cx="55" cy="25" r="25"></circle><rect x="25" y="25" width="30" height="25"></rect></svg>
          <svg className="cloud-light" id="cloud-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="25"></circle><circle cx="55" cy="25" r="25"></circle><rect x="25" y="25" width="30" height="25"></rect></svg>
          <svg className="cloud-light" id="cloud-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="25"></circle><circle cx="55" cy="25" r="25"></circle><rect x="25" y="25" width="30" height="25"></rect></svg>
          <svg className="cloud-dark" id="cloud-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="25"></circle><circle cx="55" cy="25" r="25"></circle><rect x="25" y="25" width="30" height="25"></rect></svg>
          <svg className="cloud-dark" id="cloud-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="25"></circle><circle cx="55" cy="25" r="25"></circle><rect x="25" y="25" width="30" height="25"></rect></svg>
          <svg className="cloud-dark" id="cloud-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="25"></circle><circle cx="55" cy="25" r="25"></circle><rect x="25" y="25" width="30" height="25"></rect></svg>
        </div>

        {/* Stars (visible in dark mode) */}
        <div className="stars">
          <svg className="star" id="star-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 61,39 100,39 69,61 80,100 50,75 20,100 31,61 0,39 39,39"></polygon></svg>
          <svg className="star" id="star-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 61,39 100,39 69,61 80,100 50,75 20,100 31,61 0,39 39,39"></polygon></svg>
          <svg className="star" id="star-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 61,39 100,39 69,61 80,100 50,75 20,100 31,61 0,39 39,39"></polygon></svg>
          <svg className="star" id="star-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,0 61,39 100,39 69,61 80,100 50,75 20,100 31,61 0,39 39,39"></polygon></svg>
        </div>
      </span>
    </label>
  );
};

export default ThemeToggleButton;