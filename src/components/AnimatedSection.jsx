import React from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

export default function AnimatedSection({ children, className = '' }) {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1, triggerOnce: true });
    
    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </div>
    );
};

