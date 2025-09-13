import React from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

export default function AnimatedSection({ children, className = '' }) {
    // Using the custom hook to detect when the element is on screen
    const [ref, isVisible] = useOnScreen({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <div
            ref={ref}
            // The className uses a template literal for dynamic classes
            className={`${className} transition-all duration-1000 ease-in-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            {children}
        </div>
    );
}