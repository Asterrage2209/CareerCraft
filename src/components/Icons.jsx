import React from 'react';

export const Logo = ({ className = 'h-8 w-auto' }) => (
    <svg className={className} viewBox="0 0 162 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.253 23.99C20.253 23.99 26.541 27.282 29.833 20.253C33.125 13.224 23.99 6.099 23.99 6.099" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.747 8.01C11.747 8.01 5.459 4.718 2.167 11.747C-1.125 18.776 8.01 25.901 8.01 25.901" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 2.167C16 2.167 19.292 8.455 12.263 11.747C5.234 15.039 2.167 23.99 2.167 23.99" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 29.833C16 29.833 12.708 23.545 19.737 20.253C26.766 16.961 29.833 8.01 29.833 8.01" stroke="currentColor" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="38" y="23" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="bold" fill="currentColor">CareerCraft</text>
    </svg>
);

export const SunIcon = ({ className = 'h-6 w-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon = ({ className = 'h-6 w-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const UserIcon = ({ className = 'h-6 w-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const ChevronDownIcon = ({ className = 'h-5 w-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const SendIcon = ({ className = 'h-6 w-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
  </svg>
);
