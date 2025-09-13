import React from 'react';

export default function PasswordMeter({ strength }) {
    const strengthLevels = {
        0: { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' },
        1: { label: 'Medium', color: 'bg-yellow-500', width: 'w-1/2' },
        2: { label: 'Medium', color: 'bg-yellow-500', width: 'w-3/4' },
        3: { label: 'Strong', color: 'bg-green-500', width: 'w-full' },
    };

    const { label, color, width } = strengthLevels[strength] || { label: '', color: 'bg-gray-200', width: 'w-0' };

    return (
        <div className="w-full">
            <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all duration-300 ${color} ${width}`}></div>
            </div>
            {label && <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400 font-semibold">{label}</p>}
        </div>
    );
}
